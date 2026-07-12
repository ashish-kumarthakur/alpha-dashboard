import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, LogOut } from 'lucide-react';

export default function Layout({ auth, onLogout }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans antialiased text-slate-600">
      
      {/* 🧭 Left Sidebar: Control Core Navigation Menu */}
      <aside className="w-64 bg-[#0a1128] text-slate-300 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="space-y-6">
          
          {/* Top Title Logo Block: Control Core */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="bg-blue-600 text-white w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shadow-md shadow-blue-500/20 select-none">
              α
            </div>
            <span className="text-base font-extrabold text-white tracking-wide">
              Control Core
            </span>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1">
            
            {/* 1. Dashboard Link (Visible only if admin role) */}
            {auth.role === 'admin' && (
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  location.pathname === '/dashboard' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            )}

            {/* 2. Products Link */}
            <Link 
              to="/products" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                location.pathname.startsWith('/products') 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <ShoppingBag size={18} />
              <span>Products</span>
            </Link>

            {/* 3. Users Matrix Link (🔒 ONLY Visible for Admin) */}
            {auth.role === 'admin' && (
              <Link 
                to="/users-matrix" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  location.pathname === '/users-matrix' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Users size={18} />
                <span>Users Matrix</span>
              </Link>
            )}

          </nav>
        </div>

        {/* Bottom Profile Widget Area */}
        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 flex items-center justify-between gap-2">
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate capitalize">{auth.username || 'Operator'}</p>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{auth.role}</p>
          </div>
          <button 
            onClick={onLogout} 
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg cursor-pointer transition-colors"
            title="Logout Session"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* Main Content Viewer */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-100 px-6 flex items-center justify-between shadow-sm shrink-0">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Framework / <span className="text-gray-800 font-black">{location.pathname.substring(1) || 'Root'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center uppercase shadow-inner">
              {auth.username ? auth.username.charAt(0) : 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/60">
          <Outlet />
        </main>
      </div>

    </div>
  );
}