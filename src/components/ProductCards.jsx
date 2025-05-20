import React from 'react';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import ShoeList from './SepatuListSearch';
import PopularCategories from './PopularCategories';

const ProductCards = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Main Featured Product */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <ShoeList/>
            <div className="mt-6 flex space-x-4">
              
            </div>
          </div>
        </div>
      </div>


      {/* Summer Collection */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8 text-center">
        <h2 className="font-podkova text-2xl font-bold text-gray-900 mb-4">Summer shoes from top brands</h2>
        <button className="font-podkova px-9 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Buy it Now
        </button>
      </div>

      {/* Daily Deals */}
      <h2 className="font-podkova text-2xl font-bold text-gray-900 mb-4">Daily Deals</h2>
      <PopularCategories/>
    </div>
  );
};

export default ProductCards;