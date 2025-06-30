import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import shoeData from "./sepatu.json";
import ServiceFormModal from './ServiceFormModal';

export default function ShoeList({ searchTerm, selectedCategory }) {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({
    serviceType: 'basic',
    quantity: 1,
    urgency: 'normal',
    addOns: [],
    selectedColor: 'Black'
  });

  const [filteredShoes, setFilteredShoes] = useState([]);

  // Use the same pricing and color options from the modal for consistency
  const colorOptions = [
    { name: "Black", code: "bg-gray-900" },
    { name: "White", code: "bg-white border border-gray-300" },
    { name: "Pink", code: "bg-pink-500" },
    { name: "Blue", code: "bg-blue-500" },
  ];

  useEffect(() => {
    let tempShoes = shoeData;

    if (searchTerm) {
      tempShoes = tempShoes.filter(shoe =>
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      tempShoes = tempShoes.filter(shoe =>
        shoe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredShoes(tempShoes.slice(0, 3));
  }, [searchTerm, selectedCategory]);

  const handleShowServiceForm = (shoe) => {
    setSelectedShoe(shoe);
    // Reset serviceDetails for the new shoe, but keep the selected color
    setServiceDetails({
      serviceType: 'basic',
      quantity: 1,
      urgency: 'normal',
      addOns: [],
      selectedColor: serviceDetails.selectedColor
    });
    setShowServiceForm(true);
  };

  const handleCloseServiceForm = () => {
    setShowServiceForm(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-[#f0f4f8] via-[#e6ebf2] to-[#dbe2ef]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredShoes.length > 0 ? (
          filteredShoes.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-[#d1d5db]"
            >
              <img
                src={shoe.img}
                alt={shoe.name}
                className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-5">
                <h2 className="font-podkova text-xl font-bold text-[#1e293b] mb-2 tracking-tight">
                  {shoe.name}
                </h2>
                <p className="font-podkova text-sm text-gray-500 mb-1">
                  Brand:{" "}
                  <span className="text-[#334155] font-medium">
                    {shoe.brand}
                  </span>
                </p>
                <p className="font-podkova text-sm text-gray-500 mb-1">
                  Category:{" "}
                  <span className="text-[#334155] font-medium">
                    {shoe.category}
                  </span>
                </p>
                <p className="font-podkova text-lg text-[#f59e0b] font-semibold mb-3">
                  ${shoe.price.toFixed(2)}
                </p>

                <div className="mb-4">
                  <p className="font-podkova text-sm font-medium text-gray-700 mb-2">
                    Color:
                  </p>
                  <div className="flex gap-2">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full ${color.code} hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ${serviceDetails.selectedColor === color.name ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                        title={color.name}
                        aria-label={color.name}
                        onClick={() => setServiceDetails({...serviceDetails, selectedColor: color.name})}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleShowServiceForm(shoe)}
                    className="font-podkova flex-1 py-2 px-4 border border-green-500 text-green-600 bg-white hover:bg-green-50 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart /> Add to cart
                  </button>

                  <button
                    onClick={() => handleShowServiceForm(shoe)}
                    className="font-podkova flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="font-podkova flex items-center text-[#facc15] mt-3 mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.505L.125 7.27 6.31 6.135 10 0l3.69 6.135 6.185 1.135-4.846 4.225L15.878 18.09 10 15z" />
                  </svg>
                  <span className="font-podkova text-gray-600 font-medium">
                    {shoe.rating} / 5
                  </span>
                </div>
                <p className="font-podkova text-sm text-gray-600 mb-2">
                  Stock:{" "}
                  <span className="text-[#334155] font-medium">
                    {shoe.stock}
                  </span>
                </p>
                {shoe.material && (
                  <p className="font-podkova text-sm text-gray-600 mb-2">
                    Material: Upper -{" "}
                    <span className="font-medium">{shoe.material.upper}</span>,
                    Sole -{" "}
                    <span className="font-medium">{shoe.material.sole}</span>
                  </p>
                )}
                <div className="font-podkova flex flex-wrap gap-2 mt-3">
                  {shoe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#e0f2fe] text-[#0284c7] px-3 py-1 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg py-10">
            Tidak ada sepatu yang ditemukan.
          </p>
        )}
      </div>

      {/* Render the Service Form Modal Component */}
      {showServiceForm && selectedShoe && (
        <ServiceFormModal 
          product={selectedShoe}
          serviceDetails={serviceDetails}
          setServiceDetails={setServiceDetails}
          // The modal will manage its own closing logic and state,
          // but we still need a function to close it from the parent
          onClose={handleCloseServiceForm}
          // We can also pass a simple mock function for showNotification since it's not implemented here
          showNotification={(message) => alert(message)}
        />
      )}
    </div>
  );
}