import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Edit, Trash, Star } from 'lucide-react';

export default function Products({ auth }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚀 URL State Synchronization using useSearchParams Matrix
  const [searchParams, setSearchParams] = useSearchParams();

  // Reading variables safely straight out of the URL string parameters
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const sortBy = searchParams.get('sort') || 'none';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const itemsPerPage = 5;

  // Helper hook matrix to update URL query strings dynamically on input alterations
  const updateUrlParams = useCallback((newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const combined = { ...current, ...newParams };
    
    // Clear out clean fields to avoid ugly empty parameter trails inside the URL bar
    Object.keys(combined).forEach(key => {
      if (!combined[key] || combined[key] === 'All' || combined[key] === 'none') {
        delete combined[key];
      }
    });
    
    setSearchParams(combined);
  }, [searchParams, setSearchParams]);

  // Fetching live catalog data streams from requested endpoints
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) throw new Error('Cloud storage synchronization array handshake failed.');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApiData();
  }, []);

  const dynamicCategories = useMemo(() => {
    const categories = products.map(p => p.category);
    return ['All', ...new Set(categories)];
  }, [products]);

  // Performance Optimization: Unified filtering and array sorting metrics pipeline
  const processedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || 
                            product.id.toString().includes(search);
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sortBy]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(start, start + itemsPerPage);
  }, [processedProducts, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    updateUrlParams({ page: pageNumber.toString() });
  }, [updateUrlParams]);

  if (loading) return <div className="text-center py-20 text-sm font-medium text-gray-500">Connecting inventory asset indexes...</div>;
  if (error) return <div className="text-center py-20 text-sm font-bold text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      
      {/* Search, Filter and Sort controls mapping inputs onto search query arrays */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="relative w-full xl:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search API products..." 
            value={search}
            onChange={(e) => updateUrlParams({ search: e.target.value, page: '1' })}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full xl:w-auto justify-end">
          <select 
            value={category} 
            onChange={(e) => updateUrlParams({ category: e.target.value, page: '1' })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            {dynamicCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => updateUrlParams({ sort: e.target.value, page: '1' })}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">Sort By: Default</option>
            <option value="name">Sort By: Name</option>
            <option value="price">Sort By: Price (Low to High)</option>
            <option value="rating">Sort By: Rating (High to Low)</option>
          </select>

          {auth.role === 'admin' && (
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer">
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* Main Core Products Catalog Listing Table Components Layout */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4">ID</th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Stock Status</th>
                {auth.role === 'admin' && <th className="p-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-4 font-mono text-xs text-blue-600 font-bold">
                    <Link to={`/products/${product.id}`} className="hover:underline cursor-pointer">#{product.id}</Link>
                  </td>
                  
                  {/* Clickable Row Cell Component Node items redirection link target matrix wrappers */}
                  <td className="p-4">
                    <Link to={`/products/${product.id}`} className="flex items-center gap-3 hover:text-blue-600 transition-colors cursor-pointer group">
                      <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded-lg border border-gray-100 bg-slate-50 shrink-0" />
                      <span className="font-semibold text-gray-900 leading-tight group-hover:text-blue-600">{product.title}</span>
                    </Link>
                  </td>
                  
                  <td className="p-4 text-xs text-gray-500 capitalize">{product.category}</td>
                  <td className="p-4 font-mono font-medium">${product.price}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50/60 w-fit px-2 py-0.5 rounded border border-amber-100">
                      <Star size={12} className="fill-amber-500" /> {product.rating}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {product.stock} left
                    </span>
                  </td>
                  {auth.role === 'admin' && (
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button className="hover:text-blue-600 cursor-pointer"><Edit size={16} /></button>
                        <button className="hover:text-red-600 cursor-pointer"><Trash size={16} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Grid Elements */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/20">
            <span className="text-xs text-gray-400">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-1">
              <button 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-1.5 border border-gray-200 rounded hover:bg-white text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-1.5 border border-gray-200 rounded hover:bg-white text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}