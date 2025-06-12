// import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
// import PageHeader from "../components/PageHeader";
// import ProductCards from "../components/ProductCards";


// export default function Dashboard() {
//     return (
//         <div>
//         <ProductCards/>
//         </div>
        
//     );
// }

// src/pages/Home.jsx (atau App.jsx jika ini adalah halaman utama Anda)
import React, { useState } from 'react';
import Banner from '../components/Banner'; // Import komponen Banner yang baru
import PopularCategories from '../components/PopularCategories';
import SepatuListSearch from '../components/SepatuListSearch';
import TestimonialPage from './TestimonialPage';
import Footer from '../components/Footer';


export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content Area */}
      <main className="p-4 md:p-8">
        {/* Banner Section */}
        <Banner /> {/* Render komponen Banner di sini */}

        {/* Bagian lain dari halaman Home Anda */}
        <section className="mt-12">
          <h2 className="font-podkova text-3xl font-bold text-black-800 mb-6 text-center">Produk Unggulan</h2>
          {/* Di sini Anda bisa menampilkan daftar produk, mungkin dengan filter dari header */}
          <SepatuListSearch/>
          <PopularCategories/>
          {/* ... konten produk lainnya ... */}
        </section>

        {/* Bagian Testimoni (jika ada di halaman Home) */}
        {/* <TestimonialList /> */}
        <TestimonialPage/>
      </main>
      {/* Footer (jika ada) */}
    </div>
  );
}