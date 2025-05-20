import React from 'react';
import news from '../news.json';

export default function News() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Berita Terbaru SneakStep</h1>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id_news} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <div className="text-sm text-gray-400 mb-2">{item.date}</div>
            <p className="text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

