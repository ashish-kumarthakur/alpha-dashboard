import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

//  Optimization 1: Lazy Loading for Router Pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Users = lazy(() => import('./pages/Users'));

// Simple dynamic loading fallback shell
const PageLoader = () => (
  <div className="flex items-center justify-center h-full w-full py-20 text-sm font-semibold text-slate-500">
    <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></span>
    Loading Module Core...
  </div>
);

export default function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  return (
    <Router>
      {/* React Suspense layer required for Lazy bundles */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login auth={auth} setAuth={setAuth} />} />
          
          <Route path="/" element={
            auth.isAuthenticated ? <Layout auth={auth} setAuth={setAuth}><Navigate to="/dashboard" /></Layout> : <Navigate to="/login" />
          } />
          
          <Route path="/dashboard" element={
            auth.isAuthenticated ? <Layout auth={auth} setAuth={setAuth}><Dashboard auth={auth} /></Layout> : <Navigate to="/login" />
          } />
          
          <Route path="/products" element={
            auth.isAuthenticated ? <Layout auth={auth} setAuth={setAuth}><Products auth={auth} /></Layout> : <Navigate to="/login" />
          } />
          
          <Route path="/products/:id" element={
            auth.isAuthenticated ? <Layout auth={auth} setAuth={setAuth}><ProductDetail /></Layout> : <Navigate to="/login" />
          } />

          <Route path="/users" element={
            auth.isAuthenticated ? <Layout auth={auth} setAuth={setAuth}><Users auth={auth} /></Layout> : <Navigate to="/login" />
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}