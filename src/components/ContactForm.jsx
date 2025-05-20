import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tampilkan notifikasi
    setShowSuccess(true);

    // Sembunyikan setelah 3 detik
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md bg-white shadow">
      <h2 className="text-lg font-semibold text-green-700 mb-4">Hubungi Kami</h2>

      {/* Notifikasi sukses */}
      {showSuccess && (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-sm border border-green-300 transition duration-300">
          ✅ Pesan kamu berhasil dikirim!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="message"
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
