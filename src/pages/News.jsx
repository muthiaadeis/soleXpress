// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../services/newsAPI';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;

  useEffect(() => {
    async function fetchAllNews() {
      setLoading(true);
      setError(null);
      try {
        const data = await newsAPI.fetchNews();
        setNews(data);
      } catch (err) {
        console.error('Error fetching news for list:', err.message);
        setError('Gagal memuat daftar berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Memuat daftar berita...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center py-10 text-gray-600">Tidak ada berita yang tersedia saat ini di Supabase.</div>;
  }

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="font-podkova p-6 max-w-5xl mx-auto">
      <h1 className="text-green-500 text-3xl font-bold mb-6 text-center">Berita Terbaru SoleXpress</h1>
      
      <div className="space-y-6">
        {currentNews.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            {item.image_url && (
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
            )}
            <Link to={`/news/${item.id}`} className="block">
              <h2 className="text-2xl font-semibold mb-2 text-green-400 hover:text-green-800 cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <div className="text-sm text-green-800 mb-2">
              {new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Sebelumnya
        </button>

        <span className="text-green-700 font-semibold">
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
