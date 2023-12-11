import React from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarClient from "./Sidebar";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow">
        <div className="container-fluid container">
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i className="fa fa-bars"></i>
          </button> */}
          <NavLink to="/">
            <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} />
          </NavLink>
          <div className="d-flex items-center">
            <input
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
            />
          <Link to={'/basket'} className="no-underline">
          <button className="navbar-toggler" type="button">
              <i className="fa fa-shopping-cart text-black hover:text-black"></i>
            </button>
          </Link>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            {/* <div className="offcanvas-header">
              <NavLink to="/">
                <img
                  src="/FakeShop.png"
                  alt="logo"
                  style={{ height: "50px" }}
                />
              </NavLink>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div> */}
            {/* <SidebarClient/> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
