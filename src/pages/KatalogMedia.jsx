// src/pages/KatalogMedia.jsx
import React, { useEffect, useState } from 'react';
import { katalogMediaAPI } from '../services/katalogMediaAPI';

export default function KatalogMedia() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      setError(null);
      try {
        const data = await katalogMediaAPI.getPaginated(currentPage, pageSize);
        setMediaList(data);
      } catch (err) {
        console.error('Error loading katalog media:', err.message);
        setError('Gagal memuat katalog media. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [currentPage]);

  const handleNext = () => {
    if (mediaList.length === pageSize) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (loading) return <div className="text-center py-10">Memuat katalog media...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (mediaList.length === 0) return <div className="text-center py-10 text-gray-600">Belum ada media tersedia.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-podkova">
      <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Katalog Media</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-md transition p-4">
            <div className="aspect-video mb-3 overflow-hidden rounded-lg">
              <img
                src={item.url_media}
                alt={item.judul}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-green-700">{item.judul}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(item.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Sebelumnya
        </button>

        <span className="text-green-800 font-semibold">Halaman {currentPage}</span>

        <button
          onClick={handleNext}
          disabled={mediaList.length < pageSize}
          className={`px-4 py-2 rounded-lg ${
            mediaList.length < pageSize ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
