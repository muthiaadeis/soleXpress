import React, { useState, useEffect } from 'react';
import { tentangAPI } from '../services/tentangAPI';

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await tentangAPI.fetchTentang();
        if (data && data.length > 0) {
          setAboutData(data[0]); // Using the first record
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="font-podkova max-w-6xl mx-auto p-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-podkova max-w-6xl mx-auto p-8 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="font-podkova max-w-6xl mx-auto p-8 text-center">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="font-podkova max-w-6xl mx-auto p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-12">
        Tentang SoleXpress
      </h1>

      <div className="grid gap-10 md:grid-cols-3">
        {/* Sejarah */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-4 border-green-300 pb-2">
            Sejarah
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {aboutData.sejarah}
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-4 border-green-300 pb-2">
            Visi & Misi
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-green-600">Visi:</strong> {aboutData.visi}
            </p>
            <div>
              <strong className="text-green-600">Misi:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {aboutData.misi_1 && <li>{aboutData.misi_1}</li>}
                {aboutData.misi_2 && <li>{aboutData.misi_2}</li>}
                {aboutData.misi_3 && <li>{aboutData.misi_3}</li>}
                {aboutData.misi_4 && <li>{aboutData.misi_4}</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Informasi Perusahaan */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-4 border-green-300 pb-2">
            Informasi Perusahaan
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li><strong>Nama Perusahaan:</strong> {aboutData.nama_perusahaan}</li>
            <li><strong>Alamat:</strong> {aboutData.alamat}</li>
            <li><strong>Email:</strong> <a href={`mailto:${aboutData.email}`} className="text-green-600 hover:underline">{aboutData.email}</a></li>
            <li><strong>Telepon:</strong> <a href={`tel:${aboutData.telepon}`} className="text-green-600 hover:underline">{aboutData.telepon}</a></li>
            <li><strong>Website:</strong> <a href={aboutData.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{aboutData.website}</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}