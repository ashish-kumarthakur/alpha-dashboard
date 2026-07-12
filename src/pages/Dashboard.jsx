import React from 'react';
import { ShoppingBag, Users, AlertTriangle, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Dashboard({ auth }) {
  // 1. Mock Data Source (As requested in the assignment requirement)
  const stats = [
    { id: 1, title: 'Total Products', value: '1,248', change: '+12%', isPositive: true, icon: ShoppingBag, color: 'bg-blue-500' },
    { id: 2, title: 'Active Staff/Users', value: '42', change: '+3%', isPositive: true, icon: Users, color: 'bg-green-500' },
    { id: 3, title: 'Critical Alerts', value: '7', change: '-28%', isPositive: false, icon: AlertTriangle, color: 'bg-amber-500' },
    { id: 4, title: 'Monthly Revenue', value: '$48,250', change: '+18%', isPositive: true, icon: DollarSign, color: 'bg-indigo-500' },
  ];

  const recentActivity = [
    { id: 1, type: 'alert', message: 'Product ID #2041 stock drops below threshold level.', time: '5 mins ago', severity: 'high' },
    { id: 2, type: 'info', message: 'New user "Manager_Rahul" registered under standard permissions.', time: '12 mins ago', severity: 'low' },
    { id: 3, type: 'success', message: 'Bulk catalog inventory updated successfully via CSV.', time: '1 hr ago', severity: 'normal' },
    { id: 4, type: 'alert', message: 'System detected unexpected login latency from Zone-4.', time: '2 hrs ago', severity: 'medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-6 shadow-md text-white flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Analytics Control Panel</h1>
          <p className="text-blue-200 text-sm mt-1">
            Currently acting with <span className="underline font-bold uppercase">{auth.role} privileges</span>.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg border border-white/20 backdrop-blur text-xs font-mono">
          System Node status: <span className="text-green-400 font-bold animate-pulse">● OPERATIONAL</span>
        </div>
      </div>

      {/* Grid for Summary Matrix / KPIs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.title}</span>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{stat.value}</h3>
                <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                  {stat.change}
                </span>
              </div>
              <div className={`p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visual Grid Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Performance Metrics Container */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              Operational Core Efficiency
            </h2>
            <span className="text-xs text-gray-400 font-mono">Updated real-time</span>
          </div>
          
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>Database Thread Allocation latency</span>
                <span className="font-mono text-blue-600">94.2% (Excellent)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full w-[94.2%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>API Gateway Response Interval</span>
                <span className="font-mono text-green-600">89.7% (Stable)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full w-[89.7%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>Memory Threshold Reserve</span>
                <span className="font-mono text-amber-600">62.1% (Cautionary)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full w-[62.1%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Real-time Event Streams/Logs (Requirement Point 4 partially covered) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="font-bold text-gray-800 text-lg">System Audit Feed</h2>
            <p className="text-xs text-gray-400 mt-0.5">Live monitoring event telemetry</p>
          </div>

          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex gap-3 text-sm items-start border-l-2 border-gray-200 pl-3 py-1 hover:border-blue-500 transition-colors">
                <div className="flex-1">
                  <p className="text-gray-700 text-xs font-medium">{log.message}</p>
                  <span className="text-[10px] text-gray-400 font-mono mt-1 block">{log.time}</span>
                </div>
                <span className={`text-[10px] uppercase font-mono tracking-tight px-1.5 py-0.5 rounded shrink-0 ${
                  log.severity === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                  log.severity === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-gray-50 text-gray-600'
                }`}>
                  {log.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}