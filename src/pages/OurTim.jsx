// src/components/OurTim.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Hapus import dari file JSON lama jika masih ada:
// import teamMembersData from "../DataTeam.json"; 
import { teamAPI } from '../services/teamAPI'; // <--- Impor teamAPI dari file yang sudah Anda buat

export default function OurTim() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllTeamMembers() {
      setLoading(true);
      setError(null);
      try {
        const data = await teamAPI.fetchTeamMembers(); // <--- Panggil teamAPI.fetchTeamMembers()
        setTeamMembers(data);
      } catch (err) {
        console.error('Error fetching team members for list:', err.message);
        setError('Gagal memuat daftar anggota tim. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[50vh] bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-16">
        <div className="text-center text-lg text-green-700">Memuat anggota tim...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center min-h-[50vh] bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-16">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full text-red-600">
          {error}
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-[50vh] bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-16">
        <div className="text-center text-lg text-gray-600">Tidak ada anggota tim yang tersedia saat ini.</div>
      </section>
    );
  }

  return (
    <section className="font-podkova bg-gradient-to-r from-green-100 via-green-50 to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-green-900 mb-12 text-center tracking-wide">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map(({ id, name, position, photo }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
            >
              <Link to={`/team/${id}`} className="block w-full">
                <div className="w-36 h-36 rounded-full overflow-hidden mb-5 border-4 border-green-400 shadow-md mx-auto">
                  <img
                    src={photo}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-green-800 hover:text-green-600 transition-colors duration-200">{name}</h3>
              </Link>
              <p className="text-green-600 mb-3 italic">{position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}