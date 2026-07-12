import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, LogOut } from 'lucide-react';

export default function Layout({ children, auth, setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Dynamic Left Sidebar Layer */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shrink-0">
        <div className="p-4">
          <div className="flex items-center gap-2 px-2 py-3 border-b border-slate-800 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
              α
            </div>
            <span className="text-white font-bold tracking-wider text-base">Control Core</span>
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

      {/* Main Framework Page Render Body */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shadow-sm">
          <div className="text-sm font-semibold text-gray-700">
            Welcome back, <span className="text-blue-600 font-bold capitalize">{auth.role}</span>!
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center uppercase">
            {auth.role?.charAt(0)}
          </div>
        </header>

        <div className="p-6 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}