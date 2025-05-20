import { BiCategory } from "react-icons/bi";
import { BiChat } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { IoPersonCircle } from "react-icons/io5"; // Corrected import

const Header = (
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
) => {
  const categories = ["Running", "Basketball", "Lifestyle", "Training"];
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
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
            className="font-podkova block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Product"
          />

          {/* Category Icon - positioned absolutely on the right */}
          <div className="absolute right-3 text-gray-500 hover:text-gray-700 cursor-pointer">
            <BiCategory className="text-xl" />
          </div>
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon with Badge */}
        <div className="relative p-3 bg-green-100 rounded-2xl text-black-500 cursor-pointer hover:bg-blue-200 transition-colors">
          <FaBell className="text-lg" />
        </div>

        {/* Chat Icon */}
        <div className="p-3 bg-green-100 rounded-2xl cursor-pointer hover:bg-blue-200 transition-colors">
          <BiChat className="text-lg" />
        </div>

        {/* Profile Icon */}
        <div className="p-3 bg-green-100 rounded-2xl text-black-500 cursor-pointer hover:bg-black-200 transition-colors">
          <CgProfile className="text-lg" />
        </div>
      </div>
    </header>
  );
};

export default Header;
