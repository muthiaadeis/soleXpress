import { useEffect, useState } from "react";
import axios from "axios";

export default function UseEffect() {
    const [advice, setAdvice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("https://api.adviceslip.com/advice")
            .then((response) => {
                if (response.status !== 200) {
                    setError("Failed to fetch advice.");
                    return;
                }
                setAdvice(response.data.slip);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (!advice) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-2">Random Advice</h2>
            <p className="text-gray-800 font-semibold text-lg mb-4">{advice.advice}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
                Get New Advice
            </button>
        </div>
    );
}