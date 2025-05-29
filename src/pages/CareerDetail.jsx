// src/pages/CareerDetail.jsx (Buat file baru ini)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import careersData from '../careers.json'; // PENTING: Import data karir lokal

export default function CareerDetail() {
  // Mengambil 'id' dari URL (sesuai dengan nama placeholder di App.jsx)
  const { id } = useParams(); 
  
  // State untuk menyimpan detail lowongan yang ditemukan
  const [job, setJob] = useState(null);
  // State untuk error (misal: lowongan tidak ditemukan)
  const [error, setError] = useState(null);
  // State untuk indikator loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset state setiap kali ID berubah
    setJob(null);
    setError(null);
    setIsLoading(true);

    // Konversi ID dari string ke number
    const jobIdNum = parseInt(id, 10); 

    // Validasi ID yang dikonversi
    if (isNaN(jobIdNum)) {
      setError("ID lowongan karir tidak valid.");
      setIsLoading(false);
      return;
    }

    // Cari lowongan di dalam array careersData
    const foundJob = careersData.find((item) => item.id === jobIdNum);

    // Simulasi delay (opsional)
    setTimeout(() => {
        if (foundJob) {
            setJob(foundJob); // Jika ditemukan, simpan di state
            setError(null);
        } else {
            setError("Maaf, lowongan karir tidak ditemukan.");
        }
        setIsLoading(false); // Selesai loading
    }, 300); 
  }, [id]); // Dependency array: efek ini akan jalan ulang jika 'id' berubah

  // Tampilan loading
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600 text-lg my-8">
        Memuat detail lowongan...
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="text-red-600 p-4 text-center text-xl my-8">
        {error}
        <div className="mt-4">
            <Link to="/careers" className="text-blue-500 hover:underline">Kembali ke Daftar Karir</Link>
        </div>
      </div>
    );
  }

  // Tampilan detail lowongan jika ditemukan
  return (
    <div className="font-podkova p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4 text-green-900">{job.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-gray-700 mb-6 border-b pb-4">
        <p className="flex items-center"><span className="font-semibold w-24">Lokasi:</span> 📍 {job.location}</p>
        <p className="flex items-center"><span className="font-semibold w-24">Tipe:</span> 🕒 {job.type}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3 text-green-800">Deskripsi Pekerjaan</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-green-800">Tanggung Jawab</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      )}

      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-green-800">Persyaratan</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 text-lg font-semibold">
          Lamar Sekarang
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/career" className="inline-block text-green-600 hover:underline">
          Kembali ke Daftar Lowongan
        </Link>
      </div>
    </div>
  );
}