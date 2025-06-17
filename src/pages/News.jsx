// src/pages/News.jsx
import React, { useEffect, useState } from 'react'; // Tambahkan useEffect dan useState
import { Link } from 'react-router-dom';
import { newsAPI } from '../services/newsAPI'; // Import newsAPI dari services Anda

export default function News() {
  const [news, setNews] = useState([]); // Gunakan state untuk menyimpan data berita
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllNews() {
      setLoading(true);
      setError(null);
      try {
        const data = await newsAPI.fetchNews(); // Ambil data dari Supabase via newsAPI
        setNews(data); // Set data berita ke state
      } catch (err) {
        console.error('Error fetching news for list:', err.message);
        setError('Gagal memuat daftar berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []); // Dependency array kosong agar hanya dijalankan sekali saat komponen mount

  if (loading) {
    return <div className="text-center py-10">Memuat daftar berita...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center py-10 text-gray-600">Tidak ada berita yang tersedia saat ini di Supabase.</div>;
  }

  return (
    <div className="font-podkova p-6 max-w-5xl mx-auto">
      <h1 className="text-green-500 text-3xl font-bold mb-6 text-center">Berita Terbaru SoleXpress</h1>
      <div className="space-y-6">
        {news.map((item) => ( // Iterasi melalui data 'news' dari Supabase
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"> 
            {/* Menambahkan gambar di sini */}
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
            )}
            
            {/* Bungkus judul dengan Link agar bisa diklik ke detail berita */}
            <Link to={`/news/${item.id}`} className="block">
              <h2 className="text-2xl font-semibold mb-2 text-green-400 hover:text-green-800 cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <div className="text-sm text-green-800 mb-2">
              {/* Gunakan created_at dari Supabase, bukan item.date dari JSON */}
              {new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
