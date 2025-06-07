import { BiCategory } from "react-icons/bi";
import { BiChat } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
// import { FcAreaChart } from "react-icons/fc"; // Tidak digunakan, bisa dihapus
// import { IoPersonCircle } from "react-icons/io5"; // Tidak digunakan, bisa dihapus

const Header = ({ // <-- Menerima props sebagai objek
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const categories = ["Running", "Basketball", "Lifestyle", "Training"];

  // Tambahkan state untuk mengontrol visibility kategori (opsional, jika Anda ingin pop-up kategori)
  const [showCategories, setShowCategories] = React.useState(false);

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm"> {/* Ditambah shadow */}
      {/* Product Title Section */}
      <div className="flex flex-col">
        <h1 className="font-podkova text-4xl font-semibold text-gray-800">
          Shoes
        </h1>
        <p className="font-podkova text-xl text-gray-500">For Your Style</p>
      </div>

      {/* Search Bar Section */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-3 text-gray-400">
            <FaSearch />
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="font-podkova block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500" // Warna focus diubah ke hijau
            placeholder="Search Product"
            value={searchTerm} // Mengikat nilai input ke state searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Mengupdate state searchTerm
          />

          {/* Category Icon - positioned absolutely on the right */}
          <div
            className="absolute right-3 text-gray-500 hover:text-green-700 cursor-pointer" // Warna hover diubah ke hijau
            onClick={() => setShowCategories(!showCategories)} // Toggle visibilitas kategori
          >
            <BiCategory className="text-xl" />
          </div>

          {/* Category Dropdown (Contoh sederhana) */}
          {showCategories && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                    selectedCategory === category ? "bg-green-50 font-medium text-green-700" : "text-gray-800"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategories(false); // Sembunyikan setelah memilih
                  }}
                >
                  {category}
                </div>
              ))}
              {/* Opsi untuk menghapus filter kategori */}
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-red-100 ${
                    selectedCategory === null ? "bg-red-50 font-medium text-red-700" : "text-gray-800"
                }`}
                onClick={() => {
                  setSelectedCategory(null); // Hapus filter kategori
                  setShowCategories(false);
                }}
              >
                All
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon with Badge */}
        <div className="relative p-3 bg-green-100 rounded-2xl text-gray-700 cursor-pointer hover:bg-green-200 transition-colors"> {/* Warna disesuaikan */}
          <FaBell className="text-lg" />
          {/* Contoh Badge Notifikasi */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            3
          </span>
        </div>

        {/* Chat Icon */}
        <div className="p-3 bg-green-100 rounded-2xl cursor-pointer hover:bg-green-200 transition-colors"> {/* Warna disesuaikan */}
          <BiChat className="text-lg text-gray-700" />
        </div>

        {/* Profile Icon */}
        <div className="p-3 bg-green-100 rounded-2xl text-gray-700 cursor-pointer hover:bg-green-200 transition-colors"> {/* Warna disesuaikan */}
          <CgProfile className="text-lg" />
        </div>
      </div>
    </header>
  );
};

export default Header;