import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import { dataSepatuAPI } from "../services/dataSepatuAPI";

export default function Products() {
  const breadcrumb = [""];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dataSepatuAPI.fetchAll();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (query !== "") {
      const lowercasedQuery = query.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery) ||
          product.brand.toLowerCase().includes(lowercasedQuery)
   ) }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [query, selectedCategory, products]);

  // Get all unique categories
  const categories = ["All", ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Our Products" breadcrumb={breadcrumb} />
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Our Products" breadcrumb={breadcrumb} />
        <div className="text-center py-12">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="" breadcrumb={breadcrumb} />

      {/* Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="text-black flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products (name, category, brand)..."
            className="font-podkova w-full p-4 rounded-2xl shadow-md focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-gray-200"
          />
        </div>

        {/* Category Filter */}
        <div className="text-black w-full md:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="font-podkova w-full p-4 rounded-2xl shadow-md focus:ring-2 focus:ring-emerald-500 focus:outline-none border border-gray-200 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">
            No products match your filters. 😔
          </p>
          <button 
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={product.img || "https://via.placeholder.com/300x300?text=No+Image"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    <Link 
                      to={`/products/${product.id}`} 
                      className="hover:text-emerald-500 transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {product.brand}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600">
                    ${product.price.toLocaleString()},00
                  </span>
                  <Link 
                    to={`/products/${product.id}`}
                    className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-full transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}