// src/pages/Products.jsx

import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";

// PENTING: Mengimpor data produk dari file JSON lokal Dek!
// Pastikan path ini benar sesuai lokasi file sepatu.json atau data JSON Dek
// Kita beri nama 'initialProductsData' atau 'allProductsData' untuk data mentah dari JSON
import initialProductsData from "../components/sepatu.json";
import { Link } from "react-router-dom";

export default function Products() {
  const breadcrumb = [""];

  // 1. Tempat untuk menyimpan daftar semua sepatu dari file JSON lokal
  // Kita langsung pakai 'products' sebagai state utama untuk semua data produk.
  const [products] = useState(initialProductsData); // Data ini langsung diisi dari file JSON

  // 2. Tempat untuk menyimpan daftar sepatu yang sudah difilter (kalau ada pencarian)
  // Awalnya, daftar yang difilter sama dengan semua produk.
  const [filteredProducts, setFilteredProducts] = useState(initialProductsData);

  // 3. Tempat untuk teks pencarian
  const [query, setQuery] = useState("");

  // useEffect ini khusus untuk fitur pencarian saja!
  useEffect(() => {
    // Fungsi ini akan jalan setiap kali 'query' (teks pencarian) berubah
    // Atau setiap kali 'products' (daftar semua produk) berubah

    // Kalau query-nya kosong, tampilkan semua produk dari file JSON
    if (query === "") {
      setFilteredProducts(products); // Pakai 'products' (data utama)
    } else {
      // Kalau ada isian di kolom pencarian, filter produknya
      const lowercasedQuery = query.toLowerCase();
      const filtered = products.filter(
        (
          product // Filter dari 'products' (data utama)
        ) =>
          // Sesuaikan properti di sini agar sesuai dengan struktur data di sepatu.json Dek
          // Contoh: kalau di JSON Dek ada properti 'name', 'category', 'brand'
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery) ||
          product.brand.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]); // Dependency array: jalan setiap kali 'query' atau 'products' berubah

  return (
    <div>
      

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk (nama, kategori, brand)..."
        className="font-podkova mt-5 mb-4 p-3 w-full bg-white rounded-2xl shadow-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none"
      />

      <table className="font-podkova min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-emerald-600 text-white text-left text-sm font-semibold">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Brand</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
          {filteredProducts.length === 0 && query !== "" ? ( // Jika tidak ada produk yang cocok dengan pencarian
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                Tidak ada sepatu yang cocok dengan pencarian Anda. 😔
              </td>
            </tr>
          ) : (
            // Kita mapping 'filteredProducts' untuk menampilkan hasil pencarian
            filteredProducts.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">Rp {item.price * 1000}</td>
                <td className="px-6 py-4">{item.brand}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
