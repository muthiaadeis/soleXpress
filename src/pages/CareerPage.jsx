import React from 'react';
import careers from '../careers.json';

const CareerPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Karir di SoleXpress</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {careers.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </div>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <div className="text-sm text-gray-500 mb-1">📍 {job.location}</div>
            <div className="text-sm text-gray-500">🕒 {job.type}</div>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Lamar Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPage;