// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import allProductsData from "../components/sepatu.json";
import { FiShoppingCart, FiPackage, FiShield, FiGift, FiArrowLeft } from "react-icons/fi"; // FiX sudah dihapus

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // State for service form
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [serviceDetails, setServiceDetails] = useState({
        serviceType: 'basic',
        quantity: 1,
        urgency: 'normal',
        addOns: [],
        selectedColor: 'Black'
    });

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

    useEffect(() => {
        setProduct(null);
        setError(null);
        setIsLoading(true);

        const productIdNum = parseInt(id, 10);

        if (isNaN(productIdNum)) {
            setError("ID produk tidak valid.");
            setIsLoading(false);
            return;
        }

        const foundProduct = allProductsData.find(item => item.id === productIdNum);

        if (foundProduct) {
            setProduct(foundProduct);
            setError(null);
        } else {
            setError("Maaf, produk tidak ditemukan dalam katalog kami. 😔");
        }
        setIsLoading(false);
    }, [id]);

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

    const calculateTotalPrice = () => {
        if (!product) return 0;

        // Harga dasar produk
        const baseProductPrice = product.price * serviceDetails.quantity;

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

    const confirmAddToCart = () => {
        const totalPrice = calculateTotalPrice();
        const cartItem = {
            product,
            serviceDetails,
            totalPrice,
            calculatedAt: new Date().toISOString()
        };

        console.log('Item ditambahkan ke keranjang:', cartItem);
        alert(`${product.name} (${serviceDetails.selectedColor}) ditambahkan ke keranjang\nTotal: $${totalPrice.toFixed(2)}`);

        setShowServiceForm(false);
        setServiceDetails({
            serviceType: 'basic',
            quantity: 1,
            urgency: 'normal',
            addOns: [],
            selectedColor: 'Black'
        });
    };

    const handleBackToProducts = () => {
        navigate('/products');
    };

    if (isLoading) {
        return (
            <div className="p-4 text-center text-gray-600 text-lg my-8">
                Sedang memuat detail produk...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-4 text-center text-xl my-8">
                {error}
            </div>
        );
    }
    
    if (!product) {
        return (
            <div className="p-4 text-center text-gray-600 text-lg my-8">
                Data produk tidak tersedia.
            </div>
        );
    }

    return (
        <div className="font-podkova">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto mt-8 px-6">
                <button
                    onClick={handleBackToProducts}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                    <FiArrowLeft /> Back to Products
                </button>
            </div>

            {/* Product Detail Section */}
            <div className="p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto my-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image */}
                    <div className="lg:w-1/2 flex justify-center items-start">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="rounded-xl w-full max-h-[500px] object-contain"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
                        
                        {/* Price and Discount */}
                        <p className="text-emerald-700 text-2xl font-semibold mb-4">
                            ${product.price.toFixed(2)}
                            {product.discount && product.discount > 0 && (
                                <>
                                    <span className="ml-3 text-red-500 line-through text-lg">
                                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                    </span>
                                    <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </p>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 mb-4">
                            <p><strong className="font-medium">Brand:</strong> {product.brand}</p>
                            <p><strong className="font-medium">Category:</strong> {product.category}</p>
                            <p><strong className="font-medium">Rating:</strong> {product.rating} ★</p>
                            <p><strong className="font-medium">Stock:</strong> {product.stock > 0 ? product.stock : 'Out of stock'}</p>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="font-medium text-gray-800 mb-2">Color:</p>
                            <div className="flex gap-2">
                                {colorOptions.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`w-8 h-8 rounded-full ${color.code} hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ${serviceDetails.selectedColor === color.name ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                                        title={color.name}
                                        aria-label={color.name}
                                        onClick={() => setServiceDetails({...serviceDetails, selectedColor: color.name})}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-700">{product.description}</p>
                            </div>
                        )}

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-800 mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Material */}
                        {product.material && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-800 mb-2">Material</h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {product.material.upper && <li>Upper: {product.material.upper}</li>}
                                    {product.material.sole && <li>Sole: {product.material.sole}</li>}
                                    {product.material.lining && <li>Lining: {product.material.lining}</li>}
                                </ul>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setShowServiceForm(true)}
                                className="flex-1 py-3 border border-green-500 text-green-600 bg-white hover:bg-green-50 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                disabled={product.stock <= 0}
                            >
                                <FiShoppingCart /> Add to Cart
                            </button>
                            <button 
                                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                                disabled={product.stock <= 0}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Form Modal */}
            {showServiceForm && product && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="font-bold text-lg">Service for {product.name}</h3>
                            {/* <button // Tombol silang dihapus
                                onClick={() => setShowServiceForm(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button> */}
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p>Color: {serviceDetails.selectedColor}</p>
                                    <p className="text-[#f59e0b] font-semibold">${product.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    max={product.stock}
                                    value={serviceDetails.quantity}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Service Type</label>
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
                                <label className="block text-sm font-medium mb-1">Shipping Urgency</label>
                                <select
                                    name="urgency"
                                    value={serviceDetails.urgency}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="normal">Normal (1x)</option>
                                    <option value="urgent">Urgent (1.3x)</option>
                                    <option value="veryUrgent">Very Urgent (1.7x)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Additional Services</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="addOns"
                                            value="packaging"
                                            checked={serviceDetails.addOns.includes('packaging')}
                                            onChange={handleInputChange}
                                        />
                                        <FiPackage /> Special Packaging (+${addOnPrices.packaging})
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="addOns"
                                            value="insurance"
                                            checked={serviceDetails.addOns.includes('insurance')}
                                            onChange={handleInputChange}
                                        />
                                        <FiShield /> Insurance (+${addOnPrices.insurance})
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="addOns"
                                            value="giftWrap"
                                            checked={serviceDetails.addOns.includes('giftWrap')}
                                            onChange={handleInputChange}
                                        />
                                        <FiGift /> Gift Wrapping (+${addOnPrices.giftWrap})
                                    </label>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-bold mb-2">Price Summary</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Product Price:</span>
                                        <span>${product.price.toFixed(2)} × {serviceDetails.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{serviceDetails.serviceType} Service:</span>
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
                                        <span>${(product.price * serviceDetails.quantity +
                                                servicePrices[serviceDetails.serviceType] * serviceDetails.quantity +
                                                serviceDetails.addOns.reduce((total, addOn) => total + (addOnPrices[addOn] * serviceDetails.quantity), 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Multiplier ({serviceDetails.urgency}):</span>
                                        <span>{urgencyMultiplier[serviceDetails.urgency]}x</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total:</span>
                                        <span>${calculateTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t p-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowServiceForm(false)}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAddToCart}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                            >
                                <FiShoppingCart /> Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}