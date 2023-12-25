import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/admin/Layout/index.jsx';
import Login from './components/admin/auth/sigin.jsx';
import CategoriesCrud from './components/admin/categoriesCrud/Table.jsx';
import { default as ProductCrud, default as ProductTable } from './components/admin/productCrud/Table.jsx';
import SubcategorieCom from './components/admin/subCategoriya/TableSub.jsx';
import CategoryIdPage from './pages/client/categorieid/index.jsx';
import HomePage from './pages/client/home/index.jsx';
import ProductPage from './pages/client/product/index.jsx';
import NotFound from './NotFound.jsx';
import DiscountTbale from './components/admin/discountCrud/Table.jsx';
import BaskerPage from './pages/client/basket/index.jsx';
import Banners from './components/admin/banner/Banners.jsx';
import Deliveries from './components/admin/deliveries/Table.jsx';
import OrderCrud from './components/admin/order/Orders.jsx';

function App() {
  const location = useLocation();
  const isClientPage = !location.pathname.startsWith('/admin');
  //TODO ushbu is_admin backend orqali tekshieuv kerak
  
  const is_admin = localStorage.getItem("token");

//   <div>
//   <div>
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
//         Search
//       </label>
//       <div className="relative">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//           <svg
//             className="w-4 h-4 text-gray-500 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 20"
//           >
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//           </svg>
//         </div>
//         <input
//           onChange={handleInputChange}
//           type="search"
//           id="default-search"
//           className="px-5 w-[350px] p-3 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Mahsulod qidirish...."
//           required
//         />
//         <button
//           type="submit"
//           className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   </div>
//   {
//     skip &&
//     <div className=" transition duration-150 ease-out md:ease-in absolute -z-50  w-[100%] h-[100vh]">

//       {/* <NavLink className="" to={`/product/${product?.id}`}>
//         <button className="btn btn-sm m-3 border-primary">
//           <span className="fa fa-arrow-right text-muted" />
//         </button>
//       </NavLink> */}

//       <div className="bg-white absolute p-6 rounded shadow-lg flex flex-col gap-4 w-[350px] h-[200px] sx:overflow-y-auto sx:h-[30vh]">
//         {data?.result?.categories?.map((value) => {
//           return (
//             <div>
//               <NavLink className={'no-underline'} to={`/categories/${value?.id}`}>
//                 <p className="flex items-center gap-2 cursor-pointer ">
//                   <span>                    <svg
//                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                   </svg></span> {value?.title}</p>
//               </NavLink>

//             </div>
//           )
//         })}
//         {data?.result?.products?.map((value) => {
//           return (
//             <div>
//               <NavLink className='no-underline' to={`/product/${value?.id}`}>
//                 <p className="flex items-center gap-2 cursor-pointer">
//                   <span>                    <svg
//                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                   </svg></span> {value?.title}</p>
//               </NavLink>
//             </div>
//           )
//         })}

//         {data?.result?.subcategories?.map((value) => {
//           return (
//             <div>
//               <p className="flex items-center gap-2 cursor-pointer">
//                 <span>                    <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                 </svg></span> {value?.title}
//               </p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   }

// </div>
// <div className="">
//   <Link to={'/basket'} className="no-underline  flex flex-col items-center ">
//     <h5>{dataBasket?.length}</h5>
//     <button className="navbar-toggler left-0" type="button">
//       <i className="fa fa-shopping-cart text-black  hover:text-black"></i>
//     </button>
//   </Link>
// </div>
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/categories/:id" element={<CategoryIdPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='basket' element={<BaskerPage />} />
        <Route path="/admin" element={<Login />} />
        {
          is_admin ? (
            <Route element={<Layout />}>
              <Route path="/admin/home" element={<OrderCrud />} />
              <Route path="/admin/order" element={<OrderCrud />} />
              <Route path="/admin/subcategories" element={<SubcategorieCom />} />
              <Route path="/admin/banners" element={<Banners />} />
              <Route path="/admin/dashbord" element={<ProductTable />} />
              <Route path="/admin/discount" element={<DiscountTbale />} />
              <Route path="/admin/categories" element={<CategoriesCrud />} />
              <Route path="/admin/products" element={<ProductCrud />} />
              <Route path="/admin/deliveries" element={<Deliveries />} />
              {/* <Route path="/admin/order" element={<ProductTable />} /> */}
            </Route>
          ) : null
          // <Route path="/admin/*" element={<Login />} />
        }
        <Route path="/*" element={
          <NotFound is_admin={is_admin} />
        } />
      </Routes>

    </>
  );
}

export default App;
