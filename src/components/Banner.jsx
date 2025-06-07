// src/components/Banner.jsx
import React from 'react';

export default function Banner() {
  const imageUrl = "https://mir-s3-cdn-cf.behance.net/projects/404/6c1669170450969.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.jpg";

  return (
    <section
      className="relative text-white py-20 px-8 rounded-lg shadow-xl overflow-hidden md:mx-auto md:max-w-7xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div> {/* Gradien overlay */}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
          <h2 className="font-poppins text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down"> {/* Font Poppins */}
            Temukan Gaya Terbaikmu
          </h2>
          <p className="font-lato text-xl md:text-2xl opacity-90 mb-8 animate-fade-in-up"> {/* Font Lato */}
            Koleksi sepatu terbaru untuk setiap langkahmu.
          </p>
          <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-800 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-300"> {/* Hover effect */}
            Jelajahi Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}