// src/pages/TeamMemberDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter } from "react-icons/fa"; // Import ikon
import { teamAPI } from '../services/teamAPI'; // PENTING: Import API baru Anda

export default function TeamMemberDetail() {
  // Mengambil 'id' dari URL
  const { id } = useParams(); 
  
  // State untuk menyimpan detail anggota tim yang ditemukan
  const [member, setMember] = useState(null);
  // State untuk error (misal: anggota tim tidak ditemukan)
  const [error, setError] = useState(null);
  // State untuk indikator loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemberDetail = async () => {
      // Reset state setiap kali ID berubah atau saat memulai fetch baru
      setMember(null);
      setError(null);
      setIsLoading(true);

      // Pastikan ID adalah angka yang valid sebelum memanggil API
      // Supabase biasanya menggunakan UUID (string) untuk ID, 
      // tetapi jika tabel Anda menggunakan int8 seperti DataTeam.json,
      // maka parseInt tetap diperlukan. Sesuaikan dengan tipe data ID di Supabase.
      // Jika ID di Supabase Anda adalah UUID (text), Anda TIDAK perlu parseInt(id, 10).
      const memberId = id; // Gunakan langsung id jika di Supabase ID-nya adalah UUID (string)
      // Jika ID di Supabase adalah integer (int8), gunakan:
      // const memberId = parseInt(id, 10); 
      // if (isNaN(memberId)) {
      //   setError("ID anggota tim tidak valid.");
      //   setIsLoading(false);
      //   return;
      // }

      try {
        // Panggil fungsi fetchTeamMemberById dari teamAPI
        const foundMember = await teamAPI.fetchTeamMemberById(memberId);

        if (foundMember) {
          setMember(foundMember); // Jika ditemukan, simpan di state
          setError(null);
        } else {
          // Jika foundMember adalah null (berarti API tidak menemukan data)
          setError("Maaf, anggota tim tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error fetching team member from Supabase:", err);
        // Tangani error spesifik dari API (misalnya, jika API melempar error string)
        setError(err.message || "Gagal memuat detail anggota tim dari server.");
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchMemberDetail();
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

  // Tampilan detail anggota tim jika ditemukan (member sudah tidak null)
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