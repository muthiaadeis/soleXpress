// src/pages/CareerPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { careersAPI } from '../services/careersAPI'; // Import the API functions

const CareerPage = () => {
  const [careersData, setCareersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await careersAPI.fetchAll();
        setCareersData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching careers:', err);
      }
    };

    fetchCareers();
  }, []);

  if (loading) {
    return (
      <div className="font-podkova p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-green-500 text-3xl font-bold mb-6">Karir di SoleXpress</h1>
        <p>Memuat data karir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-podkova p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-green-500 text-3xl font-bold mb-6">Karir di SoleXpress</h1>
        <p className="text-red-500">Error: {error}</p>
        <p>Gagal memuat data karir. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <div className="font-podkova p-6 max-w-5xl mx-auto">
      <h1 className="text-green-500 text-3xl font-bold mb-6 text-center">Karir di SoleXpress</h1>
      {careersData.length === 0 ? (
        <p className="text-center">Tidak ada lowongan pekerjaan saat ini.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {careersData.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <Link to={`/careers/${job.id}`} className="block">
                  <h2 className="text-2xl font-semibold text-green-600 hover:text-green-800 cursor-pointer">
                    {job.title}
                  </h2>
                </Link>
              </div>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <div className="text-sm text-gray-500 mb-1">📍 {job.location}</div>
              <div className="text-sm text-gray-500">🕒 {job.type}</div>
              
              <Link
                to={`/careers/${job.id}`}
                className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
              >
                Lihat Detail 
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerPage;