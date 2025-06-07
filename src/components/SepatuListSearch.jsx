import React, { useState, useEffect } from 'react'; // Import useEffect
import { FiShoppingCart, FiX, FiPackage, FiShield, FiGift, FiTruck, FiCheck } from 'react-icons/fi';
import shoeData from "./sepatu.json"; // Pastikan path ini benar

export default function ShoeList({ searchTerm, selectedCategory }) { // Hapus 'shoes' dari props, kita akan gunakan shoeData lokal
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({
    serviceType: 'basic',
    quantity: 1,
    urgency: 'normal',
    addOns: [],
    selectedColor: 'Black'
  });

  // State untuk daftar sepatu yang difilter
  const [filteredShoes, setFilteredShoes] = useState([]);

  // useEffect untuk memfilter sepatu setiap kali searchTerm atau selectedCategory berubah
  useEffect(() => {
    let tempShoes = shoeData; // Mulai dengan semua data sepatu

    // Filter berdasarkan searchTerm
    if (searchTerm) {
      tempShoes = tempShoes.filter(shoe =>
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter berdasarkan selectedCategory
    if (selectedCategory && selectedCategory !== 'All') { // 'All' diasumsikan sebagai opsi untuk tidak ada filter
      tempShoes = tempShoes.filter(shoe =>
        shoe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Set jumlah sepatu yang ditampilkan (misalnya, hanya 3 produk unggulan)
    // Jika Anda ingin menampilkan semua hasil pencarian, hapus `.slice(0, 3)`
    setFilteredShoes(tempShoes.slice(0, 3)); 
    // Jika Anda ingin menampilkan semua hasil filter tanpa batasan, gunakan:
    // setFilteredShoes(tempShoes); 

  }, [searchTerm, selectedCategory]); // Dependencies array: useEffect akan berjalan ulang saat ini berubah

  // Harga layanan
  const servicePrices = {
    basic: 10,
    premium: 25,
    express: 50
  };

  // Biaya tambahan
  const addOnPrices = {
    packaging: 5,
    insurance: 15,
    giftWrap: 8
  };

  // Multiplier urgensi
  const urgencyMultiplier = {
    normal: 1,
    urgent: 1.3,
    veryUrgent: 1.7
  };

  // Warna yang tersedia
  const colorOptions = [
    { name: "Black", code: "bg-gray-900" },
    { name: "White", code: "bg-white border border-gray-300" },
    { name: "Pink", code: "bg-pink-500" },
    { name: "Blue", code: "bg-blue-500" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedAddOns = [...serviceDetails.addOns];
      if (checked) {
        updatedAddOns.push(value);
      } else {
        updatedAddOns = updatedAddOns.filter(item => item !== value);
      }
      setServiceDetails({ ...serviceDetails, addOns: updatedAddOns });
    } else {
      setServiceDetails({ ...serviceDetails, [name]: value });
    }
  };

  const calculateTotalPrice = (shoe) => {
    if (!shoe) return 0;

    // Harga dasar produk
    const baseProductPrice = shoe.price * serviceDetails.quantity;

    // Harga layanan
    const servicePrice = servicePrices[serviceDetails.serviceType] * serviceDetails.quantity;

    // Biaya tambahan
    const addOnsCost = serviceDetails.addOns.reduce((total, addOn) => {
      return total + (addOnPrices[addOn] * serviceDetails.quantity);
    }, 0);

    // Total sebelum urgensi
    const subTotal = baseProductPrice + servicePrice + addOnsCost;

    // Apply urgensi multiplier
    return subTotal * urgencyMultiplier[serviceDetails.urgency];
  };

  const handleAddToCart = (shoe) => {
    setSelectedShoe(shoe);
    setShowServiceForm(true);
  };

  const confirmAddToCart = () => {
    const totalPrice = calculateTotalPrice(selectedShoe);
    const cartItem = {
      product: selectedShoe,
      serviceDetails,
      totalPrice,
      calculatedAt: new Date().toISOString()
    };

    // Simpan ke keranjang atau tampilkan notifikasi
    console.log('Item ditambahkan ke keranjang:', cartItem);
    alert(`${selectedShoe.name} (${serviceDetails.selectedColor}) ditambahkan ke keranjang\nTotal: $${totalPrice.toFixed(2)}`);

    // Reset form
    setShowServiceForm(false);
    // Reset serviceDetails for next use
    setServiceDetails({
      serviceType: 'basic',
      quantity: 1,
      urgency: 'normal',
      addOns: [],
      selectedColor: 'Black'
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-[#f0f4f8] via-[#e6ebf2] to-[#dbe2ef]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Render filteredShoes */}
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

                {/* Color Selection */}
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

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAddToCart(shoe)}
                    className="font-podkova flex-1 py-2 px-4 border border-green-500 text-green-600 bg-white hover:bg-green-50 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart /> Add to cart
                  </button>

                  <button className="font-podkova flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200">
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

      {/* Service Form Modal */}
      {showServiceForm && selectedShoe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="font-bold text-lg">Layanan untuk {selectedShoe.name}</h3>
              <button
                onClick={() => setShowServiceForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedShoe.img}
                  alt={selectedShoe.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{selectedShoe.name}</p>
                  <p>Warna: {serviceDetails.selectedColor}</p>
                  <p className="text-[#f59e0b] font-semibold">${selectedShoe.price.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jumlah</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={selectedShoe.stock}
                  value={serviceDetails.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Jenis Layanan</label>
                <select
                  name="serviceType"
                  value={serviceDetails.serviceType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="basic">Basic (+${servicePrices.basic})</option>
                  <option value="premium">Premium (+${servicePrices.premium})</option>
                  <option value="express">Express (+${servicePrices.express})</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Urgensi Pengiriman</label>
                <select
                  name="urgency"
                  value={serviceDetails.urgency}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal (1x)</option>
                  <option value="urgent">Urgent (1.3x)</option>
                  <option value="veryUrgent">Sangat Urgent (1.7x)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tambahan Layanan</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="packaging"
                      checked={serviceDetails.addOns.includes('packaging')}
                      onChange={handleInputChange}
                    />
                    Packaging Khusus (+${addOnPrices.packaging})
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="insurance"
                      checked={serviceDetails.addOns.includes('insurance')}
                      onChange={handleInputChange}
                    />
                    Asuransi (+${addOnPrices.insurance})
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="addOns"
                      value="giftWrap"
                      checked={serviceDetails.addOns.includes('giftWrap')}
                      onChange={handleInputChange}
                    />
                    Gift Wrapping (+${addOnPrices.giftWrap})
                  </label>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-2">Ringkasan Harga</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Harga Produk:</span>
                    <span>${selectedShoe.price.toFixed(2)} × {serviceDetails.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Layanan {serviceDetails.serviceType}:</span>
                    <span>+${(servicePrices[serviceDetails.serviceType] * serviceDetails.quantity).toFixed(2)}</span>
                  </div>
                  {serviceDetails.addOns.map(addOn => (
                    <div key={addOn} className="flex justify-between pl-4">
                      <span>- {addOn}:</span>
                      <span>+${(addOnPrices[addOn] * serviceDetails.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2">
                    <span>Subtotal:</span>
                    <span>${(selectedShoe.price * serviceDetails.quantity +
                          servicePrices[serviceDetails.serviceType] * serviceDetails.quantity +
                          serviceDetails.addOns.reduce((total, addOn) => total + (addOnPrices[addOn] * serviceDetails.quantity), 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multiplier ({serviceDetails.urgency}):</span>
                    <span>{urgencyMultiplier[serviceDetails.urgency]}x</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${calculateTotalPrice(selectedShoe).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end gap-2">
              <button
                onClick={() => setShowServiceForm(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={confirmAddToCart}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <FiShoppingCart /> Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}