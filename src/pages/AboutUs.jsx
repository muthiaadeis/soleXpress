import React from 'react';

export default function AboutUs() {
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
            SoleXpress didirikan pada tahun 2022 sebagai situs e-commerce terpercaya yang
            menyediakan berbagai macam sepatu branded original dengan harga kompetitif.
            Berawal dari sebuah ide untuk memudahkan para pecinta sepatu mendapatkan produk
            berkualitas tanpa harus keluar rumah, SoleXpress kini telah melayani ribuan pelanggan
            di seluruh Indonesia dengan layanan pengiriman cepat dan aman.
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-green-700 mb-4 border-b-4 border-green-300 pb-2">
            Visi & Misi
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-green-600">Visi:</strong> Menjadi platform jual beli sepatu branded
              terkemuka dan terpercaya di Indonesia.
            </p>
            <div>
              <strong className="text-green-600">Misi:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Menyediakan produk sepatu branded asli dengan harga terbaik.</li>
                <li>Menghadirkan pengalaman belanja online yang mudah, aman, dan nyaman.</li>
                <li>Memberikan layanan pelanggan responsif dan terpercaya.</li>
                <li>Memperluas jaringan distribusi untuk menjangkau seluruh wilayah Indonesia.</li>
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
            <li><strong>Nama Perusahaan:</strong> PT. SoleXpress Indonesia</li>
            <li><strong>Alamat:</strong> Jl. Setiabudi No. 88, Bandung, Jawa Barat, Indonesia</li>
            <li><strong>Email:</strong> <a href="mailto:info@solexpress.co.id" className="text-green-600 hover:underline">info@solexpress.co.id</a></li>
            <li><strong>Telepon:</strong> <a href="tel:+6281234567890" className="text-green-600 hover:underline">+62 812 3456 7890</a></li>
            <li><strong>Website:</strong> <a href="https://www.solexpress.co.id" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">www.solexpress.co.id</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
