import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck } from 'lucide-react';

export default function Login({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setAuth({ isAuthenticated: true, role: role });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* 1. Custom CSS Animations Injection */}
      <style>{`
        @keyframes customPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.15); opacity: 0.3; }
        }
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes glowMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-orb-1 { animation: customPulse 6s infinite ease-in-out; }
        .animate-orb-2 { animation: customPulse 8s infinite ease-in-out 2s; }
        .animate-entrance { animation: cardFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .moving-glow {
          background: linear-gradient(-45deg, #2563eb, #4f46e5, #06b6d4, #3b82f6);
          background-size: 300% 300%;
          animation: glowMove 4s ease infinite;
        }
      `}</style>

      {/* 2. Real Moving Tech Background Orbs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600 rounded-full blur-[100px] pointer-events-none animate-orb-1"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600 rounded-full blur-[100px] pointer-events-none animate-orb-2"></div>
      
      {/* Cyber Technical Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-40 pointer-events-none"></div>

      {/* 3. Main Glassmorphic Container Card with Entry Animation */}
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl p-8 rounded-2xl shadow-[0_0_60px_-15px_rgba(37,99,235,0.2)] text-center relative z-10 opacity-0 animate-entrance">
        
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-2 tracking-tight">
          Alpha Dashboard
        </h2>
        <p className="text-slate-400 mb-8 text-sm px-2">
          Please select your authorization level to launch application interface
        </p>
        
        <div className="space-y-4">
          {/* Admin Role Button: Ultra Moving Flowing Gradient Glow */}
          <button
            onClick={() => handleLogin('admin')}
            className="w-full moving-glow text-white font-bold p-4 rounded-xl flex items-center justify-between shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm group-hover:rotate-6 transition-transform">
                <ShieldCheck size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="tracking-wide text-sm sm:text-base">Login as Admin</p>
                <p className="text-[11px] text-blue-100/70 font-normal">Full Read/Write/Delete Privilege Matrix</p>
              </div>
            </div>
            <span className="text-xl group-hover:translate-x-1 transition-transform font-mono">&rarr;</span>
          </button>

          {/* User Role Button: Clean Tech Matte Button with Border Highlight */}
          <button
            onClick={() => handleLogin('user')}
            className="w-full bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 text-white font-bold p-4 rounded-xl flex items-center justify-between shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-slate-800 group-hover:bg-slate-700 rounded-lg transition-colors">
                <UserCheck size={24} className="text-slate-400 group-hover:text-slate-200" />
              </div>
              <div className="text-left">
                <p className="text-slate-200 group-hover:text-white tracking-wide text-sm sm:text-base">Login as Regular User</p>
                <p className="text-[11px] text-slate-400 font-normal">Auditor Level Status (Read-Only Matrix)</p>
              </div>
            </div>
            <span className="text-xl text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-transform font-mono">&rarr;</span>
          </button>
        </div>

        {/* Footer Integrity Check Line */}
        <div className="mt-8 pt-4 border-t border-slate-800/50 text-[10px] font-mono text-slate-600 tracking-wider">
          SYSTEM INTERFACE SECURED // DISCRETE DESIGN
        </div>
      </div>
    </div>
  );
}