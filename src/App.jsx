import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

// 👥 Inline Users Matrix Component view for Admin Panel
const UsersMatrixView = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
    <div className="border-b border-slate-100 pb-3">
      <h2 className="text-lg font-black text-slate-800">Operational Users Access Matrix</h2>
      <p className="text-xs text-slate-400 mt-0.5">Manage sub-nodes, security thresholds, and authentication privileges.</p>
    </div>
    <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-medium">
      Users database connected. Live monitoring active.
    </div>
  </div>
);

export default function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    username: ''
  });

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, role: null, username: '' });
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-sm text-gray-500 font-mono">Loading modules...</div>}>
        <Routes>
          
          {/* Public Route */}
          <Route 
            path="/login" 
            element={!auth.isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to={auth.role === 'admin' ? "/dashboard" : "/products"} replace />} 
          />

          {/* 🔒 Protected Routes Security Layout */}
          <Route 
            path="/" 
            element={auth.isAuthenticated ? <Layout auth={auth} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to={auth.role === 'admin' ? "/dashboard" : "/products"} replace />} />

            {/* Admin only route */}
            <Route 
              path="dashboard" 
              element={auth.role === 'admin' ? <Dashboard /> : <Navigate to="/products" replace />} 
            />

            {/* Shared routes */}
            <Route path="products" element={<Products auth={auth} />} />
            <Route path="products/:id" element={<ProductDetail auth={auth} />} />

            {/* 🔑 Active route for Users Matrix (🔒 Secured for Admin only) */}
            <Route 
              path="users-matrix" 
              element={auth.role === 'admin' ? <UsersMatrixView /> : <Navigate to="/products" replace />} 
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}