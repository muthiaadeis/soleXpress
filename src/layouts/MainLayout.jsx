import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Perubahan di sini: Ubah bg-gray-100 menjadi bg-white
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      {/* Perubahan di sini: Hapus bg-gray-100 jika ada, atau pastikan elemen ini tidak menimpa warna putih dari induk */}
      <div
        className={`flex flex-col flex-1 w-full transition-all duration-300
        ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Main Content - Pastikan ini tidak memiliki bg-gray-100 jika ingin putih */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}