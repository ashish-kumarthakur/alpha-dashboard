import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Users from './pages/Users';

export default function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />

        <Route
          path="/*"
          element={
            auth.isAuthenticated ? (
              <Layout auth={auth} setAuth={setAuth}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard auth={auth} />} />
                  <Route path="/products" element={<Products auth={auth} />} />
                  <Route path="/users" element={<Users auth={auth} />} />
                  {/* dynamic route for product details */}
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}