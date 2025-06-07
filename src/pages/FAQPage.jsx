import { useEffect, useState } from "react";
import { faqAPI } from "../services/faqAPI"; // PASTIKAN PATH KE FAQ API ANDA BENAR

export default function FAQPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState(""); // success state tidak lagi diperlukan tanpa form
  const [faqList, setFaqList] = useState([]);

  // Hapus state untuk form pertanyaan karena formnya dihilangkan
  // const [questionForm, setQuestionForm] = useState({
  //   name: "",
  //   question: "",
  // });

  useEffect(() => {
    fetchFAQsFromSupabase();
  }, []);

  const fetchFAQsFromSupabase = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await faqAPI.fetchFAQs(); 
      
      // Urutkan data: yang terbaru di atas (berdasarkan created_at, jika ada)
      // Filter hanya FAQ yang sudah memiliki jawaban
      const answeredFaqs = data.filter(faq => faq.answer && faq.answer.trim() !== ''); // Filter FAQ yang memiliki jawaban
      answeredFaqs.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        // Jika tidak ada created_at, pertahankan urutan asli atau urutan berdasarkan pertanyaan
        if (a.question < b.question) return -1;
        if (a.question > b.question) return 1;
        return 0;
      });

      setFaqList(answeredFaqs); // Setel FAQList hanya dengan FAQ yang sudah terjawab
    } catch (err) {
      console.error("Error fetching FAQs from Supabase:", err); 
      setError("Gagal memuat pertanyaan yang sering diajukan dari server.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="font-podkova min-h-screen bg-green-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8 lg:p-10">
        {error && ( // Ini bisa tetap ada untuk error fetch FAQ
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline">{error}</span>
          </p>
        )}

        <h3 className="text-3xl font-extrabold text-green-900 text-center mb-6">
          Pertanyaan yang Sering Diajukan
        </h3>

        {loading && faqList.length === 0 ? (
          <p className="text-center text-gray-600 py-4">Memuat FAQ...</p>
        ) : faqList.length === 0 ? (
          <p className="text-center text-gray-600 py-4">Belum ada FAQ yang tersedia saat ini.</p>
        ) : (
          <ul className="space-y-4">
            {faqList.map((faq) => (
              <li key={faq.id} className="bg-green-50 border border-green-200 rounded-lg shadow-sm overflow-hidden transition duration-300 ease-in-out hover:shadow-md"> 
                <details className="group">
                  <summary className="flex justify-between items-center px-5 py-4 font-semibold text-green-800 cursor-pointer text-lg leading-tight group-hover:text-green-600 transition-colors duration-200">
                    {faq.question}
                    <span className="ml-2 transition-transform duration-300 group-open:rotate-180">
                        <svg className="w-5 h-5 text-green-500 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-gray-700 border-t border-gray-200 pt-3">
                    {faq.answer} {/* Langsung tampilkan jawaban, karena sudah difilter */}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}