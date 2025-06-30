import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiX,
} from "react-icons/fi";
import { dataSepatuAPI } from "../services/dataSepatuAPI";
import { testimoniProdukAPI } from "../services/testimoniProdukAPI";
import { transaksiAPI } from "../services/transaksiAPI";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    kuantitas: 1,
    ekspedisi: "",
  });

  const [testimonialForm, setTestimonialForm] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = parseInt(id);
        const productData = await dataSepatuAPI.getById(productId);
        if (!productData) throw new Error("Produk tidak ditemukan");
        setProduct(productData);

        const allReviews = await testimoniProdukAPI.getByProductId(productId);
        setTestimonials(
          allReviews.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const showNotificationMessage = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransactionForm((prev) => ({
      ...prev,
      [name]: name === "kuantitas" ? parseInt(value) : value,
    }));
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const total = transactionForm.kuantitas * product.price;
      await transaksiAPI.create({
        id_sepatu: product.id,
        nama: transactionForm.nama,
        no_hp: transactionForm.no_hp,
        alamat: transactionForm.alamat,
        kuantitas: transactionForm.kuantitas,
        ekspedisi: transactionForm.ekspedisi,
        total_pembayaran: total,
      });
      setShowTransactionModal(false);
      setTransactionForm({
        nama: "",
        no_hp: "",
        alamat: "",
        kuantitas: 1,
        ekspedisi: "",
      });
      showNotificationMessage("Transaksi berhasil!", "success");
    } catch {
      showNotificationMessage("Transaksi gagal!", "error");
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTesti = {
        data_sepatu_id: parseInt(id),
        username: testimonialForm.userName,
        message: testimonialForm.comment,
        rating: testimonialForm.rating,
      };
      const saved = await testimoniProdukAPI.create(newTesti);
      setTestimonials((prev) => [saved, ...prev]);
      setTestimonialForm({ userName: "", rating: 0, comment: "" });
      showNotificationMessage("Terima kasih atas ulasan Anda!", "success");
    } catch {
      showNotificationMessage("Gagal mengirim ulasan.", "error");
    }
  };

  if (isLoading) return <div className="p-6 text-center">Memuat data...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="font-podkova text-black">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 flex items-center gap-2 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-auto">
            &times;
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-8 px-6">
        <button
          onClick={() => navigate("/products")}
          className="mb-4 px-4 py-2 border rounded-lg flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </button>
      </div>

      <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={product.img}
              alt={product.name}
              className="rounded-xl w-full object-contain max-h-[500px]"
            />
          </div>
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="text-emerald-700 text-2xl font-semibold">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
              {product.discount > 0 && (
                <>
                  <span className="ml-3 line-through text-red-500 text-base">
                    {(product.price / (1 - product.discount / 100)).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </p>

            <div className="space-y-1 text-sm">
              <p><strong>Merek:</strong> {product.brand}</p>
              <p><strong>Kategori:</strong> {product.category}</p>
              <p><strong>Rating:</strong> {product.rating} ★</p>
              <p><strong>Stok:</strong> {product.stock}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tag1 && <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-700">#{product.tag1}</span>}
                {product.tag2 && <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-700">#{product.tag2}</span>}
                {product.tag3 && <span className="px-2 py-1 bg-gray-100 text-sm rounded-full text-gray-700">#{product.tag3}</span>}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">Spesifikasi Produk</h2>
              <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                <li><strong>Ukuran:</strong> {product.length} x {product.width} x {product.height} cm</li>
                <li><strong>Material Atas:</strong> {product.upper_material}</li>
                <li><strong>Material Sol:</strong> {product.sole_material}</li>
                <li><strong>Lapisan Dalam:</strong> {product.lining_material}</li>
                <li><strong>Garansi:</strong> {product.warranty}</li>
                <li><strong>Perawatan:</strong> {product.care_instructions}</li>
                <li><strong>Didesain untuk:</strong> {product.designed_for}</li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowTransactionModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setShowTransactionModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Form Pembelian</h2>
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <input type="text" name="nama" value={transactionForm.nama} onChange={handleTransactionChange} placeholder="Nama Lengkap" className="w-full border rounded p-2" required />
              <input type="text" name="no_hp" value={transactionForm.no_hp} onChange={handleTransactionChange} placeholder="Nomor HP" className="w-full border rounded p-2" required />
              <textarea name="alamat" value={transactionForm.alamat} onChange={handleTransactionChange} placeholder="Alamat Lengkap" className="w-full border rounded p-2" required />
              <input type="number" name="kuantitas" value={transactionForm.kuantitas} onChange={handleTransactionChange} min="1" className="w-full border rounded p-2" required />
              <select name="ekspedisi" value={transactionForm.ekspedisi} onChange={handleTransactionChange} className="w-full border rounded p-2" required>
                <option value="">-- Pilih Ekspedisi --</option>
                <option value="JNE">JNE</option>
                <option value="J&T">J&T</option>
                <option value="SiCepat">SiCepat</option>
                <option value="AnterAja">AnterAja</option>
                <option value="POS Indonesia">POS Indonesia</option>
              </select>
              <input type="text" value={(transactionForm.kuantitas * product.price).toLocaleString("en-US", { style: "currency", currency: "USD" })} disabled className="w-full border bg-gray-100 p-2 rounded" />
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Konfirmasi Pembelian</button>
            </form>
          </div>
        </div>
      )}

      <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto mb-8">
        <h2 className="text-xl font-bold mb-4">Bagikan Pengalaman Anda</h2>
        <form onSubmit={handleTestimonialSubmit} className="space-y-4">
          <input type="text" name="userName" placeholder="Nama Anda" required value={testimonialForm.userName} onChange={(e) => setTestimonialForm({ ...testimonialForm, userName: e.target.value })} className="w-full p-2 border rounded" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar key={star} className={`cursor-pointer text-2xl ${testimonialForm.rating >= star ? "text-yellow-400" : "text-gray-300"}`} onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })} />
            ))}
          </div>
          <textarea name="comment" rows="4" placeholder="Komentar Anda" required value={testimonialForm.comment} onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })} className="w-full p-2 border rounded"></textarea>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Kirim Ulasan</button>
        </form>

        {testimonials.length > 0 && (
          <div className="mt-6 space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="font-semibold">{t.username}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className={`${t.rating >= s ? "text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p>{t.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(t.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
