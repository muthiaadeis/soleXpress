import { FiShoppingCart, FiPackage, FiShield, FiGift } from "react-icons/fi";

export default function ServiceFormModal({ product, serviceDetails, setServiceDetails, showNotification, onClose }) {
    // Service pricing
    const servicePrices = {
        basic: 10,
        premium: 25,
        express: 50
    };

    const addOnPrices = {
        packaging: 5,
        insurance: 15,
        giftWrap: 8
    };

    const urgencyMultiplier = {
        normal: 1,
        urgent: 1.3,
        veryUrgent: 1.7
    };

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

        const baseProductPrice = product.price * serviceDetails.quantity;
        const servicePrice = servicePrices[serviceDetails.serviceType] * serviceDetails.quantity;
        const addOnsCost = serviceDetails.addOns.reduce((total, addOn) => {
            return total + (addOnPrices[addOn] * serviceDetails.quantity);
        }, 0);

        const subTotal = baseProductPrice + servicePrice + addOnsCost;
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
        showNotification(`${product.name} (${serviceDetails.selectedColor}) berhasil ditambahkan ke keranjang! Total: $${totalPrice.toFixed(2)}`, 'success');

        // Reset the form and close the modal
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* START: Updated class for the modal container */}
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto text-black">
            {/* END: Updated class */}
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="font-bold text-lg text-black">Layanan untuk {product.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                            <p className="font-medium text-black">{product.name}</p>
                            <p className="text-gray-700">Warna: {serviceDetails.selectedColor}</p>
                            <p className="text-[#f59e0b] font-semibold">${product.price.toFixed(2)}</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Kuantitas</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            max={product.stock}
                            value={serviceDetails.quantity}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Jenis Layanan</label>
                        <select
                            name="serviceType"
                            value={serviceDetails.serviceType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md text-black"
                        >
                            <option value="basic">Dasar (+${servicePrices.basic})</option>
                            <option value="premium">Premium (+${servicePrices.premium})</option>
                            <option value="express">Ekspres (+${servicePrices.express})</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Prioritas Pengiriman</label>
                        <select
                            name="urgency"
                            value={serviceDetails.urgency}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md text-black"
                        >
                            <option value="normal">Normal (1x)</option>
                            <option value="urgent">Mendesak (1.3x)</option>
                            <option value="veryUrgent">Sangat Mendesak (1.7x)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Layanan Tambahan</label>
                        <div className="space-y-2 text-black">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="addOns"
                                    value="packaging"
                                    checked={serviceDetails.addOns.includes('packaging')}
                                    onChange={handleInputChange}
                                />
                                <FiPackage className="text-black" /> Kemasan Khusus (+${addOnPrices.packaging})
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="addOns"
                                    value="insurance"
                                    checked={serviceDetails.addOns.includes('insurance')}
                                    onChange={handleInputChange}
                                />
                                <FiShield className="text-black" /> Asuransi (+${addOnPrices.insurance})
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="addOns"
                                    value="giftWrap"
                                    checked={serviceDetails.addOns.includes('giftWrap')}
                                    onChange={handleInputChange}
                                />
                                <FiGift className="text-black" /> Bungkus Kado (+${addOnPrices.giftWrap})
                            </label>
                        </div>
                    </div>

                    <div className="border-t pt-4 text-black">
                        <h4 className="font-bold mb-2">Ringkasan Harga</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Harga Produk:</span>
                                <span>${product.price.toFixed(2)} × {serviceDetails.quantity}</span>
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
                                <span>${(product.price * serviceDetails.quantity +
                                            servicePrices[serviceDetails.serviceType] * serviceDetails.quantity +
                                            serviceDetails.addOns.reduce((total, addOn) => total + (addOnPrices[addOn] * serviceDetails.quantity), 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Pengali ({serviceDetails.urgency}):</span>
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
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100 text-black"
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
    );
}