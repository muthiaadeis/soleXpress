import React, { useState, useEffect } from 'react';
import { testimoniAPI } from '../services/testimoniAPI'; // PASTIKAN PATH INI BENAR

// Komponen TestimonialCard yang dipercantik dengan skema warna hijau
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 transform transition duration-300 hover:scale-[1.01] hover:shadow-2xl">
    <img
      src={testimonial.image_url || 'https://via.placeholder.com/150/d4edda/28a745?text=No+Image'} // Fallback placeholder dengan warna hijau
      alt={`Foto ${testimonial.username}`}
      className="w-24 h-24 rounded-full object-cover border-4 border-green-300 shadow-md flex-shrink-0" // Border hijau lebih gelap
    />
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.username}</h3>
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)].map((_, i) => ( // Tampilkan 5 bintang, lalu isi sesuai rating
          <svg
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} // Bintang tetap kuning untuk kontras
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.928c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.292c.921.3 1.125 1.603.49 2.279l-2.386 2.385a1 1 0 00-.264.987l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.386-2.385a1 1 0 00-.987 0l-2.386 2.385c-.785.57-1.839-.197-1.539-1.118l1.07-3.292a1 1 0 00-.264-.987L2.95 8.989c-.635-.675-.431-1.979.49-2.279h3.292a1 1 0 00.95-.69L9.049 2.928z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-800 leading-relaxed mb-3">{testimonial.message}</p>
      <p className="text-sm text-gray-500 font-medium">
        {new Date(testimonial.created_at).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  </div>
);

export default function TestimonialPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testimonialList, setTestimonialList] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await testimoniAPI.fetchTestimonials();
      // Mengurutkan testimoni berdasarkan created_at terbaru jika ada
      // Anda juga bisa menambahkan filter di sini jika hanya ingin menampilkan testimoni dengan kondisi tertentu,
      // misalnya yang sudah diapprove, atau yang ratingnya di atas tertentu.
      const sortedTestimonials = data.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0; // Pertahankan urutan jika tidak ada created_at
      });
      setTestimonialList(sortedTestimonials); 
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Gagal memuat testimonials: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-podkova  min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-12 px-4 sm:px-6 lg:px-8"> {/* Gradient hijau */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-10 lg:p-12 border border-green-100"> {/* Border hijau lebih terang */}
        
        {error && ( // Ini tetap ada untuk menampilkan error saat fetching data
          <p className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg relative mb-6 animate-pulse" role="alert">
            <strong className="font-bold">Oops!</strong>{" "}
            <span className="block sm:inline">{error}</span>
          </p>
        )}

        <h3 className="text-3xl font-extrabold text-green-900 text-center mb-8 leading-tight">
          Apa Kata Mereka?
          <p className="text-lg text-green-600 mt-2 font-normal">Ulasan dari pelanggan setia kami.</p>
        </h3>

        {loading && testimonialList.length === 0 ? (
          <p className="text-center text-green-600 py-6 text-lg animate-pulse">Memuat testimoni...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6 text-lg">{error}</p>
        ) : testimonialList.length === 0 ? (
          <p className="text-center text-green-600 py-6 text-lg">Belum ada testimoni yang tersedia.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialList.map((testimonial) => (
              <li key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}