import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
// import Topheder from "../topheader/TopHeader.jsx";
// import SecondSidebar from "../sidebar/SecondSidebar";
export default function Layout() {
  const token = "1";

  return (
    <>
      {token === "1" ? (
        <div className="flex">
          <Sidebar />
          <div className="w-full layout">
            <h1>Top Header</h1>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
}
