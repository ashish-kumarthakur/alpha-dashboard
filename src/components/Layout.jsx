import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, LogOut, Menu, X } from 'lucide-react';

export default function Layout({ children, auth, setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mobile Mobile Sidebar Toggle State Control Matrix
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, role: null });
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Users Matrix', path: '/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex relative font-sans">
      
      {/* 1. Backdrop Layer Overlay for Mobile view close constraints */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 2. Fully Responsive Sidebar (Desktop default, Mobile sliding out drawer layout) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shrink-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                α
              </div>
              <span className="text-white font-bold tracking-wider text-base">Control Core</span>
            </div>
            {/* Close Button Inside Drawer Matrix (Mobile Only) */}
            <button 
              onClick={() => setIsMobileOpen(false)} 
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links Mapping */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)} // Mobile auto close after jump
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Session Control */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* 3. Main Page Render Body Adjusting to width limits */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile View Hamburger Trigger Button (Visible only under 1024px break line) */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 truncate max-w-[180px] sm:max-w-none">
              Welcome back, <span className="text-blue-600 font-bold capitalize">{auth.role}</span>!
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center uppercase shadow-inner">
            {auth.role?.charAt(0)}
          </div>
        </header>

        {/* Outer Grid Scroll Scope */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}