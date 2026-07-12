import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ShieldAlert, History } from 'lucide-react';
// Recharts library se required visual modules import kar rahe hain
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Product Data Selector
  const productData = {
    id: id || 'PROD-001',
    name: id === 'PROD-002' ? 'Cyber Ergonomic Chair' : 'Quantum Processor X1',
    category: id === 'PROD-002' ? 'Furniture' : 'Electronics',
    price: id === 'PROD-002' ? 189.50 : 299.99,
    stock: id === 'PROD-002' ? 12 : 45,
    description: 'High-performance core asset integrated into industrial operations. Validated under strict quality metrics standard array.',
  };

  // 1. Dynamic Analytics Mock Data Matrix for Charts
  const priceHistoryData = [
    { month: 'Jan', price: productData.price * 0.9 },
    { month: 'Feb', price: productData.price * 0.95 },
    { month: 'Mar', price: productData.price * 1.05 },
    { month: 'Apr', price: productData.price * 1.02 },
    { month: 'May', price: productData.price },
  ];

  const stockMovementData = [
    { day: 'Mon', stock: productData.stock + 15 },
    { day: 'Tue', stock: productData.stock + 8 },
    { day: 'Wed', stock: productData.stock + 20 },
    { day: 'Thu', stock: productData.stock + 2 },
    { day: 'Fri', stock: productData.stock },
  ];

  return (
    <div className="space-y-6">
      {/* Upper Navigation Row */}
      <button 
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Master Inventory
      </button>

      {/* Grid Layout splits into Detail Info + Visual Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Product Asset Information */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5 lg:col-span-1 h-fit">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              {productData.id}
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-3 tracking-tight">{productData.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Category: {productData.category}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Unit Net Cost</span>
            <span className="text-3xl font-black text-slate-900 font-mono">${productData.price.toFixed(2)}</span>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Technical Summary</h4>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              {productData.description}
            </p>
          </div>
        </div>

        {/* Right Side: Full Visual Interactive Dynamic Charts Container */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart 1: Area Flow Graph representing Price Trend */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                <TrendingUp size={16} className="text-blue-600" />
                Asset Valuation & Price Trend (M-o-M)
              </h3>
              <p className="text-[11px] text-gray-400">Monthly evaluation flow metrics matrix</p>
            </div>

            <div className="h-56 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Valuation']} />
                  <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Bar Graph representing Stock Capacity Analytics */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                Vault Stock Depletion Control Array
              </h3>
              <p className="text-[11px] text-gray-400">Daily warehouse volume buffer variance updates</p>
            </div>

            <div className="h-48 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockMovementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip formatter={(value) => [`${value} Pcs`, 'Stock Balance']} />
                  <Bar dataKey="stock" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}