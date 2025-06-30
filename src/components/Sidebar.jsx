import { MdOutlinePermMedia } from "react-icons/md";
import { CgWorkAlt } from "react-icons/cg";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineInfo } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdRateReview } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { GiSonicShoes } from "react-icons/gi";
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import { FaRegNewspaper, FaQuestionCircle, FaBriefcase } from "react-icons/fa";
import {
  AiFillInfoCircle,
  AiFillContacts,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import ContactForm from "./ContactForm";

export default function Sidebar() {
  const location = useLocation();
  const [showContactInfo, setShowContactInfo] = useState(false);
  
  // Anda sudah punya ini:
  const activeLinkClass = "text-green-600 font-semibold bg-green-50 rounded-md";
  const inactiveLinkClass = "text-gray-700 hover:text-green-600";
  const breadcrumb = ["Dashboard", "Product List"];

  const handleToggleContact = () => {
    setShowContactInfo((prev) => !prev);
  };

  // Tambahkan fungsi ini untuk NavLink
  const getNavLinkClass = ({ isActive }) => {
    // Kelas dasar yang selalu ada
    let baseClass = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200";

    // Tambahkan kelas aktif atau tidak aktif berdasarkan isActive
    if (isActive) {
      // Gabungkan baseClass dengan activeLinkClass Anda
      return `${baseClass} ${activeLinkClass}`;
    } else {
      // Gabungkan baseClass dengan inactiveLinkClass Anda
      return `${baseClass} ${inactiveLinkClass}`;
    }
  };

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-200 p-6 shadow-md"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex items-center mt-6">
        <div className="text-4xl mr-3 text-green-600">
          <GiSonicShoes />
        </div>
        <h1 className="font-podkova-semibold font-semibold text-3xl text-gray-800">
          SoleXpress
        </h1>
      </div>

      {/* Menu */}
      <nav id="sidebar-menu" className="font-podkova mt-14">
        <ul className="space-y-5">
          <li>
            <Link
              to="/"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname === "/" ? activeLinkClass : inactiveLinkClass
              }`}
            >
              <AiOutlineHome className="text-3xl"/>
              <span>Home</span>
            </Link>
          </li>
          <li>
            {/* Gunakan fungsi getNavLinkClass di sini */}
            <NavLink id="menu-4" to="/products" className={({ isActive }) => {
                const isProductDetail = location.pathname.startsWith("/products/");
                return `flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                  isActive || isProductDetail ? activeLinkClass : inactiveLinkClass
                }`;
            }}>
              <GiSonicShoes className="text-3xl"/>
              Products
            </NavLink>
          </li>
          <li>
            <Link
              to="/news"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                // PERUBAHAN DI SINI: Gunakan startsWith
                location.pathname.startsWith("/news")
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <FaRegNewspaper className="text-3xl" />
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link
              to="/testimoni"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname === "/testimoni"
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <MdOutlineRateReview className="text-3xl"/>
              <span>Testimoni</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname === "/about-us"
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <AiOutlineInfoCircle className="text-3xl"/>
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link
              to="/our-team"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                // Pastikan kondisi ini sudah benar
                location.pathname.startsWith("/our-team")
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <AiOutlineTeam className="text-3xl"/>
              <span>Our Team</span>
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname === "/faq"
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <BsQuestionCircle className="text-3xl"/>
              <span>FAQ</span>
            </Link>
          </li>
          <li>
            {/* Perbaikan untuk link Career */}
            <Link
              to="/career"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname.startsWith("/career") // Menggunakan startsWith
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <CgWorkAlt className="text-3xl"/>
              <span>Careers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/katalog-media"
              className={`flex items-center space-x-3 p-2 transition-colors duration-200 ${
                location.pathname === "/katalog-media"
                  ? activeLinkClass
                  : inactiveLinkClass
              }`}
            >
              <MdOutlinePermMedia className="text-3xl" />
              <span>Katalog Media</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        {/* Form ditampilkan duluan */}
        {showContactInfo && (
          <div className="mb-4">
            <ContactForm />
          </div>
        )}

        {/* Tombol Contact Us di bawahnya */}
        <div className="bg-green-50 rounded-md shadow-sm p-4 mb-4">
          <h6 className="font-podkova font-semibold text-sm text-green-700 mb-2">
            Need Help?
          </h6>
          <button
            onClick={handleToggleContact}
            className="flex justify-center items-center p-2 bg-white rounded-md space-x-2 text-green-600 hover:bg-green-100 transition w-full"
          >
            <IoIosAdd className="mr-2" />
            <span className="font-podkova text-sm font-medium">Contact Us</span>
          </button>
        </div>
      </div>
    </div>
  );
}