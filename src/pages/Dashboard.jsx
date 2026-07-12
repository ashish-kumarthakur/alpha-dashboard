import React from 'react';
import { Database, Users, AlertTriangle, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'TOTAL PRODUCTS', value: '1,248', change: '+12%', isPositive: true, icon: <Database className="text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'ACTIVE STAFF/USERS', value: '42', change: '+3%', isPositive: true, icon: <Users className="text-green-600" />, bg: 'bg-green-50' },
    { title: 'CRITICAL ALERTS', value: '7', change: '-28%', isPositive: false, icon: <AlertTriangle className="text-amber-600" />, bg: 'bg-amber-50' },
    { title: 'MONTHLY REVENUE', value: '$48,250', change: '+18%', isPositive: true, icon: <DollarSign className="text-indigo-600" />, bg: 'bg-indigo-50' },
  ];

  const efficiencyMetrics = [
    { label: 'Database Thread Allocation latency', value: '94.2%', status: 'Excellent', color: 'bg-blue-600', textColor: 'text-blue-600' },
    { label: 'API Gateway Response Interval', value: '89.7%', status: 'Stable', color: 'bg-emerald-600', textColor: 'text-emerald-600' },
    { label: 'Memory Threshold Reserve', value: '62.1%', status: 'Cautionary', color: 'bg-amber-500', textColor: 'text-amber-600' },
  ];

  const auditLogs = [
    { message: 'Product ID #2041 stock drops below threshold level.', time: '5 mins ago', type: 'HIGH' },
    { message: 'New user "Manager_Rahul" registered under standard permissions.', time: '12 mins ago', type: 'LOW' },
    { message: 'Bulk catalog inventory updated successfully via CSV.', time: '1 hr ago', type: 'NORMAL' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Welcome/Header Panel */}
      <div className="bg-[#0b2574] text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-blue-900/10">
        <div>
          <h1 className="text-xl font-bold tracking-tight">System Analytics Control Panel</h1>
          <p className="text-xs text-blue-200/80 mt-1">Currently acting with <span className="font-bold underline decoration-cyan-400">ADMIN PRIVILEGES</span></p>
        </div>
        <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Node status: <span className="text-emerald-400 font-bold">OPERATIONAL</span></span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{card.title}</p>
              <h3 className="text-2xl font-black text-slate-800">{card.value}</h3>
              <p className={`text-[11px] font-bold ${card.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {card.isPositive ? '↗' : '↘'} {card.change}
              </p>
            </div>
            <div className={`${card.bg} p-3 rounded-xl`}>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Core Efficiency + Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Efficiency Progress Trackers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Activity size={16} className="text-blue-600" />
              <h2>Operational Core Efficiency</h2>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Updated real-time</span>
          </div>

          <div className="space-y-5">
            {efficiencyMetrics.map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>{bar.label}</span>
                  <span className={`font-mono font-bold ${bar.textColor}`}>{bar.value} ({bar.status})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bar.color} rounded-full`} style={{ width: bar.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Audit Telemetry Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="border-b border-slate-50 pb-2">
            <h2 className="font-bold text-slate-800 text-sm">System Audit Feed</h2>
            <p className="text-[10px] text-slate-400 font-medium">Live monitoring event telemetry</p>
          </div>

          <div className="space-y-4 max-h-[180px] overflow-y-auto pr-1">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex gap-3 text-xs items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="flex flex-col w-full space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${
                      log.type === 'HIGH' ? 'bg-rose-50 text-rose-600' : log.type === 'LOW' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                    }`}>{log.type}</span>
                  </div>
                  <p className="text-slate-600 leading-snug font-medium">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}