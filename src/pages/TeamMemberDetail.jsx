// src/pages/TeamMemberDetail.jsx (Buat file baru ini)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import teamMembersData from '../DataTeam.json'; // PENTING: Import data tim lokal
import { FaLinkedin, FaTwitter } from "react-icons/fa"; // Import ikon

export default function TeamMemberDetail() {
  // Mengambil 'id' dari URL (sesuai dengan nama placeholder di App.jsx)
  const { id } = useParams(); 
  
  // State untuk menyimpan detail anggota tim yang ditemukan
  const [member, setMember] = useState(null);
  // State untuk error (misal: anggota tim tidak ditemukan)
  const [error, setError] = useState(null);
  // State untuk indikator loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset state setiap kali ID berubah
    setMember(null);
    setError(null);
    setIsLoading(true);

    // Konversi ID dari string ke number
    const memberIdNum = parseInt(id, 10); 

    // Validasi ID yang dikonversi
    if (isNaN(memberIdNum)) {
      setError("ID anggota tim tidak valid.");
      setIsLoading(false);
      return;
    }

    // Cari anggota tim di dalam array teamMembersData
    const foundMember = teamMembersData.find((item) => item.id === memberIdNum);

    // Simulasi delay (opsional)
    setTimeout(() => {
        if (foundMember) {
            setMember(foundMember); // Jika ditemukan, simpan di state
            setError(null);
        } else {
            setError("Maaf, anggota tim tidak ditemukan.");
        }
        setIsLoading(false); // Selesai loading
    }, 300); 
  }, [id]); // Dependency array: efek ini akan jalan ulang jika 'id' berubah

  // Tampilan loading
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600 text-lg my-8">
        Memuat detail anggota tim...
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="text-red-600 p-4 text-center text-xl my-8">
        {error}
        <div className="mt-4">
            <Link to="/our-team" className="text-blue-500 hover:underline">Kembali ke Tim Kami</Link>
        </div>
      </div>
    );
  }

  // Tampilan detail anggota tim jika ditemukan
  return (
    <div className="font-podkova p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto my-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
          <img
            src={member.photo}
            alt={member.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2 text-green-900">{member.name}</h1>
        <p className="text-xl font-semibold text-green-700 mb-4">{member.position}</p>
        
        {member.bio && ( // Tampilkan bio jika ada
          <p className="text-gray-700 leading-relaxed mb-6">{member.bio}</p>
        )}

        <div className="flex justify-center md:justify-start space-x-6 text-green-600 text-3xl">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`} className="hover:text-green-800 transition">
              <FaLinkedin />
            </a>
          )}
          {member.twitter && (
            <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter`} className="hover:text-green-800 transition">
              <FaTwitter />
            </a>
          )}
        </div>

        <div className="mt-8 text-center md:text-left">
          <Link to="/our-team" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300">
            Kembali ke Tim Kami
          </Link>
        </div>
      </div>
    </div>
  );
}