import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiArrowLeft, FiStar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { dataSepatuAPI } from "../services/dataSepatuAPI";
import { testimoniProdukAPI } from "../services/testimoniProdukAPI";
import ServiceFormModal from "../components/ServiceFormModal";

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

    // State for testimonial form
    const [testimonialForm, setTestimonialForm] = useState({
        userName: '',
        rating: 0,
        comment: ''
    });
    const [testimonials, setTestimonials] = useState([]); // To store submitted testimonials for this product

    // State for custom notification
    const [notification, setNotification] = useState(null); // { message: '...', type: 'success' | 'error' }

    const colorOptions = [
        { name: "Black", code: "bg-gray-900" },
        { name: "White", code: "bg-white border border-gray-300" },
        { name: "Pink", code: "bg-pink-500" },
        { name: "Blue", code: "bg-blue-500" },
    ];

    useEffect(() => {
        const fetchProductAndTestimonials = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const productIdNum = parseInt(id, 10);
                if (isNaN(productIdNum)) {
                    throw new Error("Invalid product ID");
                }

                const productData = await dataSepatuAPI.getById(productIdNum);

                if (!productData) {
                    throw new Error("Product not found");
                }

                setProduct(productData);

                // Fetch testimonials for this specific product ID
                const productTestimonials = await testimoniProdukAPI.getByProductId(productIdNum);
                // Sort testimonials by created_at in descending order (newest first)
                setTestimonials(productTestimonials.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductAndTestimonials();
    }, [id]);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null); // Notification disappears after 3 seconds
        }, 3000);
    };

    const handleTestimonialChange = (e) => {
        const { name, value } = e.target;
        setTestimonialForm({ ...testimonialForm, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setTestimonialForm({ ...testimonialForm, rating: newRating });
    };

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTestimonial = {
                data_sepatu_id: parseInt(id, 10),
                username: testimonialForm.userName,
                message: testimonialForm.comment,
                rating: testimonialForm.rating,
            };
            const createdTestimonial = await testimoniProdukAPI.create(newTestimonial);
            setTestimonials(prev => [createdTestimonial, ...prev]); // Add the newest one at the top
            showNotification('Terima kasih atas ulasan Anda!', 'success'); // Success notification
            // Reset form
            setTestimonialForm({ userName: '', rating: 0, comment: '' });
        } catch (err) {
            console.error("Gagal mengirim ulasan:", err);
            showNotification('Gagal mengirim ulasan. Silakan coba lagi.', 'error'); // Error notification
        }
    };

    const handleBackToProducts = () => {
        navigate('/products');
    };

    const handleCloseServiceForm = () => {
        setShowServiceForm(false);
        setServiceDetails({ // Reset service details when closing the form
            serviceType: 'basic',
            quantity: 1,
            urgency: 'normal',
            addOns: [],
            selectedColor: serviceDetails.selectedColor // Keep the selected color
        });
    };

    if (isLoading) {
        return (
            <div className="p-4 text-center text-gray-600 text-lg my-8">
                Memuat detail produk...
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
        <div className="font-podkova text-black">
            {/* Custom Notification Component */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-xl text-white flex items-center gap-2 z-50 transform transition-transform duration-300 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                    {notification.type === 'success' ? <FiCheckCircle className="text-2xl" /> : <FiXCircle className="text-2xl" />}
                    <span>{notification.message}</span>
                    <button onClick={() => setNotification(null)} className="ml-auto text-white opacity-75 hover:opacity-100">
                        &times;
                    </button>
                </div>
            )}

            {/* Back Button */}
            <div className="max-w-6xl mx-auto mt-8 px-6">
                <button
                    onClick={handleBackToProducts}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                    <FiArrowLeft /> Kembali ke Produk
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
                                        {(product.price / (1 - product.discount / 100)).toFixed(2)}
                                    </span>
                                    <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </p>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 mb-4">
                            <p><strong className="font-medium">Merek:</strong> {product.brand}</p>
                            <p><strong className="font-medium">Kategori:</strong> {product.category}</p>
                            <p><strong className="font-medium">Rating:</strong> {product.rating} ★</p>
                            <p><strong className="font-medium">Stok:</strong> {product.stock > 0 ? product.stock : 'Stok habis'}</p>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <p className="font-medium text-gray-800 mb-2">Warna:</p>
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

                        {/* Material Info */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-800 mb-2">Material</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {product.upper_material && <li>Atas: {product.upper_material}</li>}
                                {product.sole_material && <li>Sol: {product.sole_material}</li>}
                                {product.lining_material && <li>Lapisan: {product.lining_material}</li>}
                            </ul>
                        </div>

                        {/* Tags */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-800 mb-2">Tag</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tag1 && <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{product.tag1}</span>}
                                {product.tag2 && <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{product.tag2}</span>}
                                {product.tag3 && <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{product.tag3}</span>}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => setShowServiceForm(true)}
                                className="flex-1 py-3 border border-green-500 text-green-600 bg-white hover:bg-green-50 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                disabled={product.stock <= 0}
                            >
                                <FiShoppingCart /> Tambah ke Keranjang
                            </button>
                            <button
                                onClick={() => setShowServiceForm(true)}
                                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                                disabled={product.stock <= 0}
                            >
                                Beli Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            ---

            {/* Testimonial Form Section */}
            <div className="p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto my-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Bagikan Pengalaman Anda</h2>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Anda
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={testimonialForm.userName}
                            onChange={handleTestimonialChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="Masukkan nama Anda"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                        </label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FiStar
                                    key={star}
                                    className={`cursor-pointer text-2xl ${testimonialForm.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    onClick={() => handleRatingChange(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Komentar Anda
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            value={testimonialForm.comment}
                            onChange={handleTestimonialChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="Tuliskan pendapat Anda tentang produk ini..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Kirim Ulasan
                    </button>
                </form>

                {/* Display Testimonials */}
                {testimonials.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Ulasan Pelanggan</h3>
                        <div className="space-y-4">
                            {testimonials.map((t) => (
                                <div key={t.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <p className="font-semibold text-gray-800">{t.username}</p>
                                    <div className="flex items-center gap-1 my-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FiStar
                                                key={star}
                                                className={`${t.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{t.message}</p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {new Date(t.created_at).toLocaleDateString('id-ID', { // Use 'id-ID' for Indonesian date format
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            ---

            {/* Render the Service Form Modal Component */}
            {showServiceForm && product && (
                <ServiceFormModal
                    product={product}
                    serviceDetails={serviceDetails}
                    setServiceDetails={setServiceDetails}
                    showNotification={showNotification}
                    onClose={handleCloseServiceForm}
                />
            )}
        </div>
    );
}