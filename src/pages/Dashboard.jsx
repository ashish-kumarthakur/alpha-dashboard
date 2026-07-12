import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingBag, Users, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Live Operational Sync Telemetry Metrics Map
const ANALYTICS_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

export default function Dashboard({ auth }) {
  return (
    <div className="space-y-6">
      
      {/* Top Premium Header Control Panel Banner */}
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
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200">System Node status: <span className="text-green-400 uppercase">Operational</span></span>
          </div>
        </div>
      </div>

      {/* Original Custom Layout Metrics Matrix Blocks Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Products</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">1,248</div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">
              <ArrowUpRight size={12} /> +12%
            </div>
          </div>
          <div className="p-4 bg-blue-600 text-white rounded-xl shadow-blue-100 shadow-lg"><ShoppingBag size={20} /></div>
        </div>

        {/* Card 2: Active Staff Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Active Staff/Users</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">42</div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">
              <ArrowUpRight size={12} /> +3%
            </div>
          </div>
          <div className="p-4 bg-green-500 text-white rounded-xl shadow-green-100 shadow-lg"><Users size={20} /></div>
        </div>

        {/* Card 3: Critical Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Critical Alerts</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">7</div>
            <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded w-fit">
              <ArrowDownRight size={12} /> -28%
            </div>
          </div>
          <div className="p-4 bg-amber-500 text-white rounded-xl shadow-amber-100 shadow-lg"><AlertTriangle size={20} /></div>
        </div>

        {/* Card 4: Monthly Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Monthly Revenue</span>
            <div className="text-2xl font-black text-gray-900 tracking-tight">$48,250</div>
            <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded w-fit">
              <ArrowUpRight size={12} /> +18%
            </div>
          </div>
          <div className="p-4 bg-indigo-600 text-white rounded-xl shadow-indigo-100 shadow-lg"><DollarSign size={20} /></div>
        </div>

      </div>

      {/* Split Layout: Metrics Controls + Audit Logger Feed Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Operational Core Efficiency Bars + Embedded Recharts Graph */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Efficiency Progress Metrics Bars Component Area */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <span className="text-blue-600 font-bold">📈</span>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">Operational Core Efficiency</h2>
              <span className="ml-auto text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">Updated real-time</span>
            </div>

            <div className="space-y-4">
              {/* Process Bar 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>Database Thread Allocation latency</span>
                  <span className="text-blue-600">94.2% (Excellent)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              {/* Process Bar 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>API Gateway Response Interval</span>
                  <span className="text-green-600">89.7% (Stable)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '89.7%' }}></div>
                </div>
              </div>

              {/* Process Bar 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>Memory Threshold Reserve</span>
                  <span className="text-amber-600">62.1% (Cautionary)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '62.1%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Data Stream Recharts Visualizer Module Grid Container */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">Operational Analytics Chart</h3>
              <p className="text-xs text-gray-400">Data visualization mapping stream trends metrics</p>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalesMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontMono />
                  <YAxis stroke="#94a3b8" fontSize={11} fontMono />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSalesMetric)" name="Operational Nodes" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Column 3: The System Audit Feed Event Logger Shell */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between">
          <div className="space-y-4 w-full">
            <div className="pb-2 border-b border-gray-50">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-wide">System Audit Feed</h2>
              <p className="text-xs text-gray-400">Live monitoring event telemetry logs</p>
            </div>

            {/* Event Logs Mock Queue Wrapper element lists */}
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