// src/components/NewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../services/newsAPI';

export default function NewsDetail() {
  const { id_news } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await newsAPI.fetchNewsById(id_news);
        setNewsItem(data);
      } catch (err) {
        if (err.name === "NotFoundError") {
          setError('Berita tidak ditemukan.');
        } else {
          console.error('Error fetching news detail:', err.message);
          setError('Terjadi kesalahan saat memuat berita.');
        }
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    }

    if (id_news) {
      fetchNewsDetail();
    }
  }, [id_news]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-lg text-green-700">Memuat detail berita...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <Link to="/news" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300">
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-lg text-gray-600">Berita tidak tersedia.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Tampilkan gambar jika ada */}
        {newsItem.image_url && (
          <img
            src={newsItem.image_url}
            alt={newsItem.title}
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-8 lg:p-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {newsItem.title}
          </h1>
          <p className="text-sm text-green-700 mb-6 font-medium">
            Dipublikasikan pada:&nbsp;
            {new Date(newsItem.created_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <div className="prose prose-lg text-gray-700 leading-relaxed mb-8">
            <p className="text-lg">{newsItem.content}</p>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    </div>
  );
}
