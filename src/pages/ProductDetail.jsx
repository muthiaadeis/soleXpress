// src/pages/ProductDetail.jsx
// Atau sesuaikan path file ini di proyek Anda

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// TIDAK PERLU lagi import axios karena kita tidak pakai API eksternal
// import axios from "axios"; 

// PENTING: Import data produk dari file sepatu.json Anda!
// Sesuaikan path ini (misal: '../data/sepatu.json', '../../sepatu.json', dst.)
import allProductsData from "../components/sepatu.json"; // Sesuaikan path jika beda

export default function ProductDetail() {
    // Mengambil 'id' dari URL (misal: untuk URL /product/20, maka id akan menjadi "20")
    const { id } = useParams(); 
    
    // State untuk menyimpan detail produk yang ditemukan
    const [product, setProduct] = useState(null);
    // State untuk error (misal: produk tidak ditemukan, atau ID tidak valid)
    const [error, setError] = useState(null);
    // State untuk indikator sedang memuat data
    const [isLoading, setIsLoading] = useState(true);

    // useEffect untuk mencari produk berdasarkan ID dari data lokal
    useEffect(() => {
        // Reset state setiap kali ID di URL berubah (untuk memastikan tampilan bersih)
        setProduct(null);
        setError(null);
        setIsLoading(true);

        // --- MULAI DEBUGGING CONSOLE.LOG ---
        console.log("ID dari URL (string):", id);
        console.log("Semua data produk yang diimport:", allProductsData);
        // --- AKHIR DEBUGGING CONSOLE.LOG ---

        // Konversi ID dari string (dari useParams) ke number
        // karena ID di sepatu.json Anda kemungkinan besar adalah number.
        const productIdNum = parseInt(id, 10); 

        // --- MULAI DEBUGGING CONSOLE.LOG ---
        console.log("ID setelah konversi ke number:", productIdNum);
        // --- AKHIR DEBUGGING CONSOLE.LOG ---

        // Periksa apakah ID yang dikonversi adalah angka yang valid
        if (isNaN(productIdNum)) {
            setError("ID produk tidak valid. Pastikan URL benar (misal: /product/20).");
            setIsLoading(false);
            return; // Hentikan eksekusi jika ID tidak valid
        }

        // Cari produk di dalam array allProductsData yang diimport
        // Menggunakan metode .find() yang efisien untuk mencari item pertama yang cocok
        const foundProduct = allProductsData.find(
            (item) => {
                // --- MULAI DEBUGGING CONSOLE.LOG ---
                // Ini akan membandingkan setiap ID item di JSON dengan ID dari URL
                console.log(`Membandingkan item.id (${item.id}) dengan productIdNum (${productIdNum})`);
                // --- AKHIR DEBUGGING CONSOLE.LOG ---
                return item.id === productIdNum; // Bandingkan ID
            }
        );

        // --- MULAI DEBUGGING CONSOLE.LOG ---
        console.log("Produk yang ditemukan:", foundProduct);
        // --- AKHIR DEBUGGING CONSOLE.LOG ---

        // Update state berdasarkan hasil pencarian
        if (foundProduct) {
            setProduct(foundProduct); // Jika produk ditemukan, simpan datanya
            setError(null);           // Hapus pesan error jika sebelumnya ada
        } else {
            // Jika produk tidak ditemukan di data lokal
            setError("Maaf, produk tidak ditemukan dalam katalog kami. 😔");
        }
        setIsLoading(false); // Selesai memuat data
    }, [id]); // Dependency array: useEffect akan berjalan ulang hanya jika 'id' di URL berubah

    // --- Bagian Rendering UI ---

    // Tampilkan pesan loading saat data sedang dicari
    if (isLoading) {
        return (
            <div className="p-4 text-center text-gray-600 text-lg my-8">
                Sedang memuat detail produk...
            </div>
        );
    }

    // Tampilkan pesan error jika ada masalah (produk tidak ditemukan, ID tidak valid, dll.)
    if (error) {
        return (
            <div className="text-red-600 p-4 text-center text-xl my-8">
                {error}
            </div>
        );
    }
    
    // Ini adalah kondisi fallback jika product tidak ada setelah loading selesai dan tidak ada error.
    // Seharusnya tidak tercapai jika logika di atas sudah benar.
    if (!product) {
        return (
            <div className="p-4 text-center text-gray-600 text-lg my-8">
                Data produk tidak tersedia.
            </div>
        );
    }

    // Tampilan detail produk jika data produk sudah ditemukan dan siap ditampilkan
    return (
        <div className="font-podkova p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto my-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Bagian Gambar Produk */}
                <div className="md:w-1/2 flex justify-center items-center">
                    <img
                        // Menggunakan product.img sesuai dengan contoh JSON Anda
                        src={product.img} 
                        // Menggunakan product.name sesuai dengan contoh JSON Anda
                        alt={product.name} 
                        className="rounded-xl w-full max-h-96 object-contain" 
                    />
                </div>

                {/* Bagian Detail Produk */}
                <div className="md:w-1/2">
                    {/* Menggunakan product.name sesuai dengan contoh JSON Anda */}
                    <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
                    
                    {/* Harga dan Diskon */}
                    <p className="text-emerald-700 text-2xl font-semibold mb-4">
                        Harga: Rp {product.price ? (product.price * 1000).toLocaleString('id-ID') : 'N/A'}
                        {product.discount && product.discount > 0 && (
                            <>
                                <span className="ml-3 text-red-500 line-through text-lg">
                                    Rp {((product.price * 1000) / (1 - product.discount / 100)).toLocaleString('id-ID')}
                                </span>
                                <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {product.discount}% OFF
                                </span>
                            </>
                        )}
                    </p>

                    {/* Informasi Dasar: Brand, Kategori, Rating, Stok */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 mb-4">
                        <p><strong className="font-medium">Brand:</strong> {product.brand || 'N/A'}</p>
                        <p><strong className="font-medium">Kategori:</strong> {product.category || 'N/A'}</p>
                        {product.rating && (
                            <p><strong className="font-medium">Rating:</strong> {product.rating} ★</p>
                        )}
                        {product.stock !== undefined && ( // Periksa jika stock ada
                            <p><strong className="font-medium">Stok:</strong> {product.stock > 0 ? product.stock : 'Habis'}</p>
                        )}
                    </div>

                    {/* Deskripsi Produk (jika ada) */}
                    {product.description && (
                        <p className="text-gray-700 mb-4">{product.description}</p>
                    )}

                    {/* Tags (jika ada) */}
                    {product.tags && product.tags.length > 0 && (
                        <div className="mb-4">
                            <strong className="font-medium text-gray-800">Tags:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dimensi (jika ada) */}
                    {product.dimensions && (
                        <div className="mb-4">
                            <strong className="font-medium text-gray-800">Dimensi (cm):</strong>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {product.dimensions.length && <li>Panjang: {product.dimensions.length}</li>}
                                {product.dimensions.width && <li>Lebar: {product.dimensions.width}</li>}
                                {product.dimensions.height && <li>Tinggi: {product.dimensions.height}</li>}
                            </ul>
                        </div>
                    )}

                    {/* Material (jika ada) */}
                    {product.material && (
                        <div className="mb-4">
                            <strong className="font-medium text-gray-800">Material:</strong>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {product.material.upper && <li>Atas: {product.material.upper}</li>}
                                {product.material.sole && <li>Sol: {product.material.sole}</li>}
                                {product.material.lining && <li>Lapisan: {product.material.lining}</li>}
                            </ul>
                        </div>
                    )}

                    {/* Detail Produk Lainnya (jika ada) */}
                    {product.product_details && (
                        <div className="mb-4">
                            <strong className="font-medium text-gray-800">Detail Produk Tambahan:</strong>
                            <ul className="list-disc list-inside text-gray-700 mt-1">
                                {product.product_details.warranty && <li>Garansi: {product.product_details.warranty}</li>}
                                {product.product_details.care_instructions && <li>Perawatan: {product.product_details.care_instructions}</li>}
                                {product.product_details.designed_for && <li>Dirancang untuk: {product.product_details.designed_for}</li>}
                            </ul>
                        </div>
                    )}
                    
                    {/* Tombol "Tambahkan ke Keranjang" */}
                    <button className="mt-6 w-full bg-emerald-600 text-white px-4 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-300 font-semibold">
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
}