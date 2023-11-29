import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetCategoryQuery } from "../redux/slice/client/category";

const Navbar = () => {
  const { data } = useGetCategoryQuery();
  console.log(data);
  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow">
        <div className="container-fluid container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i className="fa fa-bars"></i>
          </button>

          <NavLink to="/">
            <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} />
          </NavLink>
          <Link to={"/cart"}>
            <button className="navbar-toggler" type="button">
              <i className="fa fa-shopping-cart"></i>
            </button>
          </Link>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <NavLink className={"no-underline"} to="/">
                <h1 className="text-center">Omo Food</h1>
              </NavLink>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="">
              {data?.map((item) => {
                return (
                  <div key={item.id} className="">
                    <Link className="no-underline" to="/">
                      <h1 className="text-2xl text-gray-600 ml-4">{item?.title}</h1>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
