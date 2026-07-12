import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShoppingBag, Star, DollarSign, Layers } from 'lucide-react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  Live API Connection to pull raw catalog datasets
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) throw new Error('Failed to synchronize cloud analytical feeds.');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  //  Dynamic Mathematical Computations using useMemo Optimization Matrix
  const stats = useMemo(() => {
    if (!products.length) return { totalProducts: 0, avgRating: '0.0', totalValue: 0, chartData: [] };

    // 1. Total Products Count
    const totalProducts = products.length;

    // 2. Average Rating Calculation
    const totalRating = products.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = (totalRating / totalProducts).toFixed(2);

    // 3. Total Inventory Value (Sum of Price * Stock for each item)
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);

    // 4. Category Distribution Pipeline for the BarChart Matrix
    const categoryMap = {};
    products.forEach(p => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    // Transform map to object shape suitable for Recharts configuration
    const chartData = Object.keys(categoryMap).map(cat => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: categoryMap[cat]
    })).slice(0, 6); // Top 6 categories to maintain clean viewport density

    return { totalProducts, avgRating, totalValue, chartData };
  }, [products]);

  if (loading) return <div className="text-center py-20 text-sm font-medium text-gray-500">Processing live analytical telemetry streams...</div>;
  if (error) return <div className="text-center py-20 text-sm font-bold text-red-500">Error fetching insights: {error}</div>;

  // Vibrant color configurations matrix for the bars mapping
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-6">
      
      {/*  Dashboard Top Context Control Panel Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">System Analytics Control Panel</h1>
            <p className="text-xs text-slate-300 font-medium tracking-wide">
              Live Cloud Infrastructure Operational Matrix Engine
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200">Live API Sync: <span className="text-green-400 uppercase">ONLINE</span></span>
          </div>
        </div>
      </div>

      {/* Requirements: Analytical Summary Cards Grid Blocks (1 to 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1: Total Products Counter */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Products</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">{stats.totalProducts} Items</div>
            <span className="text-[10px] text-gray-400 block">Total items in active database stream</span>
          </div>
          <div className="p-4 bg-blue-600 text-white rounded-xl shadow-blue-100 shadow-lg shrink-0"><ShoppingBag size={20} /></div>
        </div>

        {/* Metric 2: Average Rating Metric */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Average Rating</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
              {stats.avgRating} <span className="text-sm font-bold text-gray-400">/ 5.0</span>
            </div>
            <span className="text-[10px] text-gray-400 block">Accumulated rating score median</span>
          </div>
          <div className="p-4 bg-amber-500 text-white rounded-xl shadow-amber-100 shadow-lg shrink-0"><Star size={20} className="fill-white" /></div>
        </div>

        {/* Metric 3: Total Inventory Valuation Matrix */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Inventory Value</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">
              ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <span className="text-[10px] text-gray-400 block">Cumulative valuation matrix: sum(price * stock)</span>
          </div>
          <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-emerald-100 shadow-lg shrink-0"><DollarSign size={20} /></div>
        </div>

      </div>

      {/*  Requirement 4: Category Distribution Visualizer BarChart Layout */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md"><Layers size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Category Distribution Overview</h3>
            <p className="text-xs text-gray-400">Quantitative frequency index grouped dynamically by segment domains</p>
          </div>
        </div>

        {/* Recharts dynamic container bounding structural data blocks */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="value" name="Product Count" radius={[4, 4, 0, 0]} maxBarSize={45}>
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}