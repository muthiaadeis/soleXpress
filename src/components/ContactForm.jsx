import React, { useState } from "react";
import { pesansaranAPI } from "../services/pesansaranAPI";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await pesansaranAPI.create({
        nama: formData.name,
        email: formData.email,
        pesan: formData.message,
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setErrorMessage(
        "Terjadi kesalahan saat mengirim pesan. Coba lagi nanti."
      );
    }
  };

  return (
    <div className="p-4 border border-green-200 rounded-md bg-white text-black font-podkova">
      <h2 className="text-lg font-semibold text-green-700 mb-4">
        Hubungi Kami
      </h2>

      {showSuccess && (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-sm border border-green-300 transition duration-300">
          ✅ Pesan kamu berhasil dikirim!
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm border border-red-300 transition duration-300">
          ⚠️ {errorMessage}
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
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
        />
        <textarea
          name="message"
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
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
