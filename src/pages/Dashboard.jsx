import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

// Live Telemetry Metric Data for Analytics Graph
const ANALYTICS_DATA = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

export default function Dashboard({ auth }) {
  return (
    <div className="space-y-6">
      {/* Top Statistical Summary Cards Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20} /></div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Total Revenue</p>
            <p className="text-xl font-bold text-gray-900">$24,500</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><ShoppingBag size={20} /></div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Live Products</p>
            <p className="text-xl font-bold text-gray-900">100 items</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={20} /></div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">System Users</p>
            <p className="text-xl font-bold text-gray-900">1,240</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><TrendingUp size={20} /></div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Conversion Rate</p>
            <p className="text-xl font-bold text-gray-900">4.8%</p>
          </div>
        </div>
      </div>

      {/* GRAPH MODULE: Analytics Performance Area Chart Framework */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Operational Analytics Overview</h2>
          <p className="text-xs text-gray-400">Real-time data synchronization feed metrics</p>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" h="100%">
            <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" name="Sales Matrix" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}