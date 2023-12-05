import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/client/Navbar.jsx';
import HomePage from './pages/client/home/index.jsx';
import CategoryIdPage from './pages/client/categorieid/index.jsx';
import ProductPage from './pages/client/product/index.jsx';
import Login from './components/admin/auth/sigin.jsx';
import Layout from './components/admin/Layout/index.jsx';
import ProductTable from './components/admin/productCrud/Table.jsx';
import Footer from './components/client/Footer.jsx';
import CategoriesCrud from './components/admin/categoriesCrud/Table.jsx';
import ProductCrud from './components/admin/productCrud/Table.jsx';
import SubcategorieCom from './components/admin/subCategoriya/Table.jsx';

function App() {
  const location = useLocation();
  const isClientPage = !location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/categories/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/admin/home" element={<ProductTable />} />
          <Route path="/admin/dashbord" element={<ProductTable />} />
          <Route path="/admin/categorie" element={<CategoriesCrud />} />
          <Route path="/admin/subcategorie" element={<SubcategorieCom />} />
          <Route path="/admin/product" element={<ProductCrud />} />
          <Route path="/admin/order" element={<ProductTable />} />
        </Route>

        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>

    </>
  );
}

export default App;
