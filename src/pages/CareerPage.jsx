// src/pages/CareerPage.jsx (atau di mana pun Anda menyimpannya)

import React from 'react';
import { Link } from 'react-router-dom'; // PENTING: Import Link
import careersData from '../careers.json'; // Saya ubah nama variabel jadi careersData

const CareerPage = () => {
  return (
    <div className="font-podkova p-6 max-w-5xl mx-auto">
      <h1 className="text-green-500 text-3xl font-bold mb-6 text-center">Karir di SoleXpress</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {careersData.map((job) => ( // Gunakan careersData
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              {/* Bungkus judul dengan Link */}
              <Link to={`/careers/${job.id}`} className="block"> {/* Perhatikan path '/careers/:id' */}
                <h2 className="text-2xl font-semibold text-green-600 hover:text-green-800 cursor-pointer">{job.title}</h2>
              </Link>
            </div>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <div className="text-sm text-gray-500 mb-1">📍 {job.location}</div>
            <div className="text-sm text-gray-500">🕒 {job.type}</div>
            
            {/* Ubah tombol "Lamar Sekarang" menjadi Link ke halaman detail */}
            <Link to={`/careers/${job.id}`} className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200">
              Lihat Detail & Lamar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPage;