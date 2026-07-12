import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Edit, Trash, Star } from 'lucide-react';

// Updated dynamic catalog with Rating and Image elements
const INITIAL_PRODUCTS = [
  { 
    id: 'PROD-001', 
    name: 'Alpha Quantum Server', 
    category: 'Enterprise', 
    price: 14200, 
    stock: 42, 
    rating: 4.8, 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&auto=format&fit=crop&q=60' 
  },
  { 
    id: 'PROD-002', 
    name: 'Neural Net Core Node', 
    category: 'Hardware', 
    price: 8900, 
    stock: 15, 
    rating: 4.5, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=60' 
  },
  { 
    id: 'PROD-003', 
    name: 'SaaS Telemetry Suite', 
    category: 'Software', 
    price: 450, 
    stock: 120, 
    rating: 4.2, 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&auto=format&fit=crop&q=60' 
  },
  { 
    id: 'PROD-004', 
    name: 'Cyber Firewall Mesh', 
    category: 'Enterprise', 
    price: 6200, 
    stock: 8, 
    rating: 4.9, 
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=60' 
  },
  { 
    id: 'PROD-005', 
    name: 'Optic Fiber Bus Rack', 
    category: 'Hardware', 
    price: 1150, 
    stock: 64, 
    rating: 3.9, 
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&auto=format&fit=crop&q=60' 
  },
  { 
    id: 'PROD-006', 
    name: 'Cloud Storage Vault', 
    category: 'Software', 
    price: 89, 
    stock: 500, 
    rating: 4.6, 
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=150&auto=format&fit=crop&q=60' 
  },
];

export default function Products({ auth }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                            product.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Filters Menu */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={category} 
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>

          {auth.role === 'admin' && (
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-sm cursor-pointer transition-all">
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* Main Datatable Component with Ratings & Thumbnails */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4">SKU / ID</th>
                <th className="p-4">Item Detail</th>
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
                  {/* (a) Product ID Code */}
                  <td className="p-4 font-mono text-xs text-blue-600 font-bold">
                    <Link to={`/products/${product.id}`} className="hover:underline">{product.id}</Link>
                  </td>
                  
                  {/* (b & c) Product Thumbnail Image + Product Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded-lg border border-gray-100 bg-slate-50 shrink-0" 
                      />
                      <span className="font-semibold text-gray-900 leading-tight">{product.name}</span>
                    </div>
                  </td>
                  
                  {/* (d) Category Text */}
                  <td className="p-4 text-xs text-gray-500">{product.category}</td>
                  
                  {/* (e) Price Value */}
                  <td className="p-4 font-mono font-medium">${product.price.toLocaleString()}</td>
                  
                  {/* (g) Dynamic Product Stars Rating system */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50/60 w-fit px-2 py-0.5 rounded border border-amber-100">
                      <Star size={12} className="fill-amber-500" />
                      {product.rating}
                    </div>
                  </td>

                  {/* (f) Stock Status Metrics */}
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      product.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {product.stock} units
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

        {/* Navigation Pagination */}
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