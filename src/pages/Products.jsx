import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Filter, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Extended Mock Database Array for handling Filtering and Pagination
const INITIAL_PRODUCTS = [
  { id: 'PROD-001', name: 'Quantum Processor X1', category: 'Electronics', price: 299.99, stock: 45, status: 'In Stock' },
  { id: 'PROD-002', name: 'Cyber Ergonomic Chair', category: 'Furniture', price: 189.50, stock: 12, status: 'Low Stock' },
  { id: 'PROD-003', name: 'Titanium Mechanical Keyboard', category: 'Electronics', price: 120.00, stock: 85, status: 'In Stock' },
  { id: 'PROD-004', name: 'AeroStream Wireless Mouse', category: 'Electronics', price: 59.99, stock: 120, status: 'In Stock' },
  { id: 'PROD-005', name: 'Nebula Smart Lumens Lamp', category: 'Home Decor', price: 45.00, stock: 0, status: 'Out of Stock' },
  { id: 'PROD-006', name: 'Orthopedic Standing Desk', category: 'Furniture', price: 450.00, stock: 8, status: 'Low Stock' },
  { id: 'PROD-007', name: 'HyperX Noise Cancelling Pods', category: 'Electronics', price: 150.00, stock: 60, status: 'In Stock' },
  { id: 'PROD-008', name: 'Minimalist Oak Coffee Table', category: 'Furniture', price: 210.00, stock: 15, status: 'In Stock' },
  { id: 'PROD-009', name: 'Ultra-Wide Curved Monitor 34"', category: 'Electronics', price: 549.99, stock: 4, status: 'Low Stock' },
  { id: 'PROD-010', name: 'Smart Fitness Tracker Band', category: 'Electronics', price: 79.99, stock: 200, status: 'In Stock' },
];

export default function Products({ auth }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Pagination State Variables
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Computational Logic for Search and Filtering ---
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- Pagination Boundary Math Calculation ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Administrative Handler Functions
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to purge ${id} from the live master catalog?`)) {
      setProducts(products.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Upper Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Master Product Inventory</h1>
          <p className="text-xs text-gray-400 mt-0.5">Real-time control and allocation matrix array</p>
        </div>
        
        {/* Conditional rendering based on role check (Requirement Point 3) */}
        {auth.role === 'admin' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold shadow-sm shadow-blue-200 transition-all active:scale-95">
            <Plus size={16} />
            Add New Product
          </button>
        )}
      </div>

      {/* Advanced Control Filters & Search Bar layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Search Field */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by product name or serial hash (ID)..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Dropdown Select Filters */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer text-gray-700 font-medium"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
      </div>

      {/* Grid view container / Responsive Table Layer */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4">Product ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Unit Price</th>
                <th className="p-4 text-center">Stock Level</th>
                <th className="p-4 text-center">Status</th>
                {auth.role === 'admin' && <th className="p-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono text-xs font-semibold">
  <Link to={`/product/${product.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
    {product.id}
  </Link>
</td>
                    <td className="p-4 font-bold text-gray-900">{product.name}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold font-mono">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-center font-medium font-mono">{product.stock} pcs</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold tracking-wide ${
                        product.status === 'In Stock' ? 'bg-green-50 text-green-600' :
                        product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    
                    {/* Role-based action button access restrictions (Admin Only) */}
                    {auth.role === 'admin' && (
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                            <Edit2 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={auth.role === 'admin' ? 7 : 6} className="text-center p-8 text-gray-400 font-medium">
                    No records found matching current query constraints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Computational Pagination Controller UI block */}
        {totalPages > 1 && (
          <div className="bg-white border-t border-gray-100 p-4 flex items-center justify-between text-sm select-none">
            <span className="text-gray-400">
              Showing <span className="font-semibold text-gray-700">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-gray-700">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of{' '}
              <span className="font-semibold text-gray-700">{filteredProducts.length}</span> results
            </span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    currentPage === pageNum 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-100' 
                      : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
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