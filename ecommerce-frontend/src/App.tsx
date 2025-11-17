// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import Dashboard from './components/dashboard';
import {ProductsPage} from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

// // Simple auth check
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route
        path="/"
        element={
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
