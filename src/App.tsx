import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import AppNavbar from './components/Navbar';
function App() {
  return (
    <HashRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* Placeholder for add product page */}
        <Route path="/add-product" element={<div className="container mt-4"><h2>Add Product Page Coming Soon!</h2></div>} />
        {/* Catch-all route to handle 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;