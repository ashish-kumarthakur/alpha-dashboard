import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShoppingBag, Star, DollarSign, Layers } from 'lucide-react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚀 Live API Integration to fetch database stream
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

  // 📈 Live Math Calculations using useMemo Pipeline
  const stats = useMemo(() => {
    if (!products.length) return { totalProducts: 0, avgRating: '0.0', totalValue: 0, chartData: [] };

    const totalProducts = products.length;
    const totalRating = products.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = (totalRating / totalProducts).toFixed(2);
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);

    const categoryMap = {};
    products.forEach(p => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    const chartData = Object.keys(categoryMap).map(cat => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: categoryMap[cat]
    })).slice(0, 5); // Clean viewport density

    return { totalProducts, avgRating, totalValue, chartData };
  }, [products]);

  if (loading) return <div className="text-center py-20 text-sm font-medium text-gray-500">Syncing live server parameters...</div>;
  if (error) return <div className="text-center py-20 text-sm font-bold text-red-500">Error: {error}</div>;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      
      {/* 🟦 1. System Analytics Control Panel Banner (PRESERVED) */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">System Analytics Control Panel</h1>
            <p className="text-xs text-slate-300 font-medium tracking-wide">
              Currently acting with <span className="text-amber-400 font-bold underline decoration-2">ADMIN PRIVILEGES</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200">System Node status: <span className="text-green-400 uppercase">OPERATIONAL</span></span>
          </div>
        </div>
      </div>

      {/* 📊 2. Mandatory Core Analytical Cards Grid (UPGRADED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Products Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Products</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">{stats.totalProducts} Items</div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">+12%</div>
          </div>
          <div className="p-4 bg-blue-600 text-white rounded-xl shadow-blue-100 shadow-lg"><ShoppingBag size={20} /></div>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Average Rating</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">{stats.avgRating} <span className="text-sm font-bold text-gray-400">/ 5.0</span></div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">+3%</div>
          </div>
          <div className="p-4 bg-amber-500 text-white rounded-xl shadow-amber-100 shadow-lg"><Star size={20} className="fill-white" /></div>
        </div>

        {/* Total Inventory Value Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Inventory Value</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">${stats.totalValue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">+18%</div>
          </div>
          <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-emerald-100 shadow-lg"><DollarSign size={20} /></div>
        </div>

      </div>

      {/* 📉 3. Composite Two-Column Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Heavy Column: Core Efficiency Progress + Category Distribution Chart */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 🟩 PRESERVED: Operational Core Efficiency Bars */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">📈</span>
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">Operational Core Efficiency</h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">Updated real-time</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>Database Thread Allocation latency</span>
                  <span className="text-blue-600">94.2% (Excellent)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: '94.2%' }}></div></div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>API Gateway Response Interval</span>
                  <span className="text-green-600">89.7% (Stable)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: '89.7%' }}></div></div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>Memory Threshold Reserve</span>
                  <span className="text-amber-600">62.1% (Cautionary)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: '62.1%' }}></div></div>
              </div>
            </div>
          </div>

          {/* 📊 REQUIRED: Category Distribution Analytics BarChart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md"><Layers size={16} /></div>
              <div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Category Distribution Overview</h3>
                <p className="text-xs text-gray-400">Quantitative frequency grouped dynamically by live segments</p>
              </div>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="value" name="Product Count" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {stats.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: System Audit Feed Panel */}
        {/* 📋 PRESERVED: System Audit Feed Event Logger */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between">
          <div className="space-y-4 w-full">
            <div className="pb-2 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">System Audit Feed</h2>
              <p className="text-xs text-gray-400">Live monitoring event telemetry logs</p>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100 flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 font-medium leading-tight">Product ID #2041 stock drops below threshold level.</p>
                  <span className="text-[10px] text-gray-400 block font-medium">5 mins ago</span>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700 bg-red-50 rounded shrink-0">High</span>
              </div>

              <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100 flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 font-medium leading-tight">New user "Manager_Rahul" registered under standard permissions.</p>
                  <span className="text-[10px] text-gray-400 block font-medium">12 mins ago</span>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded shrink-0">Low</span>
              </div>

              <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100 flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 font-medium leading-tight">Bulk catalog inventory updated successfully via CSV payload.</p>
                  <span className="text-[10px] text-gray-400 block font-medium">1 hr ago</span>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 rounded shrink-0">Normal</span>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2 bg-gray-50 border border-gray-100 text-xs font-bold text-gray-500 rounded-xl hover:bg-gray-100/70 transition-all cursor-pointer">
            View Complete Logs Matrix
          </button>
        </div>

      </div>

    </div>
  );
}