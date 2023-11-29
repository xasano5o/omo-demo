// App.js or your main component
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import CategoryIdPage from './components/CategoryIdPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
