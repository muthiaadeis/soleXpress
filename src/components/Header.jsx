import React, { useState } from "react";
import { BiCategory, BiChat } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const categories = ["Running", "Basketball", "Lifestyle", "Training"];
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between text-black">
      {/* Kiri: Toggle sidebar */}
      <div className="flex items-center space-x-3">
        {/* Tombol hamburger yang memanggil onToggleSidebar */}
        {/* Tambahkan hover:text-green-700 (atau warna hijau lain) di sini */}
        <button
          className="btn btn-square btn-ghost hover:bg-green-100 hover:text-green-700 transition duration-200 ease-in-out" // <-- TAMBAHKAN hover:text-green-700 DAN transisi
          onClick={onToggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-current" // stroke-current akan mengambil warna dari text-green-700
            fill="none"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-left">
          <h1 className="text-xl font-semibold font-podkova text-gray-800">Shoes</h1>
          <p className="text-sm font-podkova text-gray-500 -mt-1">For Your Style</p>
        </div>
      </div>

      {/* Tengah: Search */}
      <div className="relative w-full max-w-md mx-4 hidden md:block">
        <div className="absolute left-3 top-2.5 text-black-400">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search Product"
          className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 font-podkova"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          className="absolute right-3 top-2.5 text-gray-500 hover:text-green-700 cursor-pointer"
          onClick={() => setShowCategories(!showCategories)}
        >
          <BiCategory className="text-xl" />
        </div>

        {/* Dropdown kategori */}
        {showCategories && (
          <div className="absolute z-10 top-full mt-2 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            {categories.map((category) => (
              <div
                key={category}
                className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                  selectedCategory === category
                    ? "bg-green-50 font-medium text-green-700"
                    : "text-gray-800"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
              >
                {category}
              </div>
            ))}
            <div
              className={`px-4 py-2 cursor-pointer hover:bg-red-100 ${
                selectedCategory === null
                  ? "bg-red-50 font-medium text-red-700"
                  : "text-gray-800"
              }`}
              onClick={() => {
                setSelectedCategory(null);
                setShowCategories(false);
              }}
            >
              All
            </div>
          </div>
        )}
      </div>

      {/* Kanan: Ikon */}
      <div className="flex items-center space-x-3">
        <div className="relative p-2 bg-green-100 rounded-2xl hover:bg-green-200 cursor-pointer transition">
          <FaBell className="text-lg text-gray-700" />
          <span className="absolute top-0 right-0 px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
            3
          </span>
        </div>

        <div className="p-2 bg-green-100 rounded-2xl hover:bg-green-200 cursor-pointer transition">
          <BiChat className="text-lg text-gray-700" />
        </div>

        <div
          className="p-2 bg-green-100 rounded-2xl hover:bg-green-200 cursor-pointer transition"
          onClick={() => navigate("/login")}
        >
          <CgProfile className="text-lg text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Header;