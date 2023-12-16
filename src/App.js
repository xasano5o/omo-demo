import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/admin/Layout/index.jsx';
import Login from './components/admin/auth/sigin.jsx';
import CategoriesCrud from './components/admin/categoriesCrud/Table.jsx';
import { default as ProductCrud, default as ProductTable } from './components/admin/productCrud/Table.jsx';
import SubcategorieCom from './components/admin/subCategoriya/TableSub.jsx';
import Basket from './components/client/Basket.jsx';
import CategoryIdPage from './pages/client/categorieid/index.jsx';
import HomePage from './pages/client/home/index.jsx';
import ProductPage from './pages/client/product/index.jsx';
// import SubcategorieCom from './components/admin/subCategoriya/TableSub.jsx';
import DiscountTbale from './components/admin/discountCrud/Table.jsx';
import BaskerPage from './pages/client/basket/index.jsx';

function App() {
  const location = useLocation();
  const isClientPage = !location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/categories/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='basket' element={<BaskerPage />} />
        <Route path="/admin" element={<Login />} />
       
        <Route element={<Layout />}>
          <Route path="/admin/home" element={<ProductTable />} />
          <Route path="/admin/subcategories" element={<SubcategorieCom />} />
          <Route path="/admin/dashbord" element={<ProductTable />} />
          <Route path="/admin/discount" element={<DiscountTbale />} />
          <Route path="/admin/categories" element={<CategoriesCrud />} />
          <Route path="/admin/products" element={<ProductCrud />} />
          <Route path="/admin/order" element={<ProductTable />} />
        </Route>
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>

    </>
  );
}

export default App;
