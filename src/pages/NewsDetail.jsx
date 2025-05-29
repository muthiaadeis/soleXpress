// src/pages/NewsDetail.jsx (Buat file baru ini)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams dan Link
import newsData from '../news.json'; // PENTING: Import data berita lokal

export default function NewsDetail() {
  // Mengambil 'id_news' dari URL (sesuai dengan nama placeholder di App.jsx)
  const { id_news } = useParams(); 
  
  // State untuk menyimpan detail berita yang ditemukan
  const [newsItem, setNewsItem] = useState(null);
  // State untuk error (misal: berita tidak ditemukan)
  const [error, setError] = useState(null);
  // State untuk indikator loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset state setiap kali ID berita berubah
    setNewsItem(null);
    setError(null);
    setIsLoading(true);

    // Konversi id_news dari string (dari useParams) ke number
    const newsIdNum = parseInt(id_news, 10); 

    // Validasi ID yang dikonversi
    if (isNaN(newsIdNum)) {
      setError("ID berita tidak valid.");
      setIsLoading(false);
      return;
    }

    // Cari berita di dalam array newsData
    const foundNews = newsData.find((item) => item.id_news === newsIdNum);

    // Simulasi delay (opsional, untuk efek loading)
    setTimeout(() => {
        if (foundNews) {
            setNewsItem(foundNews); // Jika ditemukan, simpan di state
            setError(null);
        } else {
            setError("Maaf, berita tidak ditemukan.");
        }
        setIsLoading(false); // Selesai loading
    }, 300); // Penundaan 300ms
  }, [id_news]); // Dependency array: efek ini akan jalan ulang jika 'id_news' berubah

  // Tampilan loading
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600 text-lg my-8">
        Memuat berita...
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="text-red-600 p-4 text-center text-xl my-8">
        {error}
        <div className="mt-4">
            <Link to="/news" className="text-blue-500 hover:underline">Kembali ke Daftar Berita</Link>
        </div>
      </div>
    );
  }

  // Tampilan detail berita jika ditemukan
  return (
    <div className="font-podkova p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4 text-green-900">{newsItem.title}</h1>
      <div className="text-sm text-green-500 mb-6 border-b pb-4">
        Tanggal Publikasi: {newsItem.date}
      </div>
      <p className="text-green-800 leading-relaxed whitespace-pre-line">{newsItem.content}</p> {/* whitespace-pre-line untuk menjaga format paragraf */}

      <div className="mt-8 text-center">
        <Link to="/news" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300">
          Kembali ke Daftar Berita
        </Link>
      </div>
    </div>
  );
}