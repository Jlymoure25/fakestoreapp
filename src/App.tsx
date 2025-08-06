import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import AppNavbar from './components/Navbar';

function App() {
  // Detect if we're on GitHub Pages or other platforms
  const basename = window.location.hostname.includes('github.io') ? '/fakestoreapp' : '';
  
  return (
    <BrowserRouter basename={basename}>
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
    </BrowserRouter>
  );
}

export default App;