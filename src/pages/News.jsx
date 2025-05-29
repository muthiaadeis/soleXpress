// src/pages/News.jsx (atau di mana pun Anda menyimpannya)

import React from 'react';
import { Link } from 'react-router-dom'; // PENTING: Import Link
import newsData from '../news.json'; // Pastikan path ini benar

export default function News() {
  return (
    <div className="font-podkova p-6 max-w-5xl mx-auto">
      <h1 className="text-green-500 text-3xl font-bold mb-6 text-center">Berita Terbaru SoleXpress</h1>
      <div className="space-y-6">
        {newsData.map((item) => (
          <div key={item.id_news} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            {/* Bungkus judul dengan Link agar bisa diklik ke detail berita */}
            <Link to={`/news/${item.id_news}`} className="block"> {/* Perhatikan path '/news/:id_news' */}
              <h2 className="text-2xl font-semibold mb-2 text-green-400 hover:text-green-800 cursor-pointer">
                {item.title} {/* Hanya menampilkan judul */}
              </h2>
            </Link>
            <div className="text-sm text-green-800 mb-2">
              {item.date} {/* Hanya menampilkan tanggal */}
            </div>
            {/* Bagian ini Dihapus atau Dikomentari agar 'content' tidak muncul di daftar berita:
              <p className="text-gray-700">
                  {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                  {item.content.length > 150 && (
                      <Link to={`/news/${item.id_news}`} className="text-blue-500 hover:underline ml-1">Baca Selengkapnya</Link>
                  )}
              </p>
            */}
          </div>
        ))}
      </div>
    </div>
  );
}