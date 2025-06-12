import React from 'react';

const PopularCategories = () => {
  // Sample data for popular brands
  const popularBrands = [
    { name: 'Nike', orders: 1200, rating: 4.8 },
    { name: 'Adidas', orders: 980, rating: 4.7 },
    { name: 'Puma', orders: 850, rating: 4.6 },
    { name: 'New Balance', orders: 720, rating: 4.5 },
    { name: 'Converse', orders: 680, rating: 4.4 },
    { name: 'Vans', orders: 650, rating: 4.3 },
    { name: 'Reebok', orders: 600, rating: 4.2 },
    { name: 'Under Armour', orders: 550, rating: 4.1 },
    { name: 'Asics', orders: 500, rating: 4.0 },
    { name: 'Skechers', orders: 480, rating: 3.9 }
  ];

  // Sample data for newest sellers
  const newestSellers = [
    { name: 'On Running', orders: 460, rating: 4.7 },
    { name: 'Hoka', orders: 420, rating: 4.6 },
    { name: 'Salomon', orders: 380, rating: 4.5 },
    { name: 'Allbirds', orders: 350, rating: 4.4 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header Section */}
      <div className="font-podkova flex justify-between items-center mb-8">
        <h2 className="font-podkova text-3xl font-bold text-green-400">Explore The Popular Categories</h2>
        <button className="font-podkova text-grey-600 font-medium hover:underline">See all</button>
      </div>

      {/* Popular Brands Section */}
      <div className="mb-12 text-black">
        <h3 className="font-podkova text-xl font-semibold text-gray-800 mb-4">Popular top 10 brands</h3>
        <p className="font-podkova text-gray-500 mb-6">$400+ Orders & reviews</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularBrands.map((brand, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center justify-center h-16 mb-4">
                <span className="font-podkova text-2xl font-bold">{brand.name}</span>
              </div>
              <div className="font-podkova flex justify-between text-sm text-gray-600">
                <span>{brand.orders}+ orders</span>
                <span className="flex items-center">
                  <svg className="font-podkova w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.505L.125 7.27 6.31 6.135 10 0l3.69 6.135 6.185 1.135-4.846 4.225L15.878 18.09 10 15z" />
                  </svg>
                  {brand.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newest Sellers Section */}
      <div className="text-black">
        <h3 className="font-podkova text-xl font-semibold text-gray-800 mb-4">Newest Sellers</h3>
        <p className="font-podkova text-gray-500 mb-6">460+ Orders & reviews</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {newestSellers.map((seller, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center justify-center h-16 mb-4">
                <span className="font-podkova text-2xl font-bold">{seller.name}</span>
              </div>
              <div className="font-podkova flex justify-between text-sm text-gray-600">
                <span>{seller.orders}+ orders</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.505L.125 7.27 6.31 6.135 10 0l3.69 6.135 6.185 1.135-4.846 4.225L15.878 18.09 10 15z" />
                  </svg>
                  {seller.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;