import { Search, ArrowRight, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useProducts from "../hooks/use-products";

export const Home = () => {
  const navigate = useNavigate();
  const {
    products,
    pagination,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
  } = useProducts(12);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.product_name.toLowerCase().includes(query) ||
      product.company_name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  const handleProductClick = (product) => {
    navigate("/review", { state: product });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Pending Product Reviews
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Total Products: {pagination.totalItems}
            </p>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-6">
            <AlertCircle className="text-red-600" size={20} />
            <div>
              <p className="font-semibold text-red-800">
                Error loading products
              </p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery
                ? "No products match your search"
                : "No products available"}
            </p>
          </div>
        )}

        {/* Product Cards */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
                >
                  <div className="mb-3">
                    <h2 className="font-semibold text-gray-800">
                      {product.product_name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {product.company_name}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.industry?.slice(0, 2).map((ind, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>

                  <button
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition"
                    onClick={() => handleProductClick(product)}
                  >
                    Review Product <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={!pagination.hasPreviousPage}
                  onClick={goToPreviousPage}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  disabled={!pagination.hasNextPage}
                  onClick={goToNextPage}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
