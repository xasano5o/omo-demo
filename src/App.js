import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/client/Navbar.jsx';
import HomePage from './pages/client/home/index.jsx';
import CategoryIdPage from './pages/client/categorieid/index.jsx';
import ProductPage from './pages/client/product/index.jsx';
import Login from './components/admin/auth/sigin.jsx';
import HomeAdmin from './components/admin/home/Sidebar.jsx';
import Footer from './components/client/Footer.jsx';

function App() {
  const token = true;
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/admin"
          element={
            token ? (
              <Routes>
                <Route index  element={<HomeAdmin />} />
              </Routes>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      {!isAdminRoute && !token && <Footer />}
    </>
  );
}

export default App;
