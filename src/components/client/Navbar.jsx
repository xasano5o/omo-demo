import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useGetSearchQuery } from "../../redux/slice/client/search";
const Navbar = () => {
  const [skip, setSkip] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { data } = useGetSearchQuery(debouncedSearch);
  // Debounce function
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    // Cleanup function to clear the timer if the search value changes
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setSkip(true);
  };
  useEffect(() => {
    if (search?.length === 0) setSkip(false);
  }, [search]);

  useEffect(() => {
    if (skip === false) setSearch('');
  }, [skip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkip(false);
  };

  const close = () => {
    setSkip(false)
    setSearch('')
  }
  return (
    <div>
      <nav className="navbar bg-light fixed-top shadow">
        <div className="container-fluid container grid grid-cols-3 ">
          <div className="flex gap-3 items-center">
            <NavLink className='no-underline' to="/">
              {/* <img src="/FakeShop.png" alt="logo" style={{ height: "50px" }} /> */}
              <h1 className="no-underline ">Omo <b className="text-yellow-600">Food</b></h1>
            </NavLink>
          </div>

          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    onChange={handleInputChange}
                    type="search"
                    id="default-search"
                    className="px-5 w-[350px] p-3 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mahsulod qidirish...."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            {
              skip &&
              <div onClick={close} className="transition duration-150 ease-out md:ease-in absolute  -z-10 w-[100%] h-[100vh]">
                <div className="bg-white absolute p-6 rounded shadow-lg flex flex-col gap-4 w-[350px] h-[200px] sx:overflow-y-auto sx:h-[30vh]">
             
                </div>
                </div>
            }

          </div>
          <div className="d-flex items-center gap-4 ">
            <Link to={'/basket'} className="no-underline  flex flex-col items-center ">
              <span className="bg-yellow-500 rounded-full  px-2">{data?.length}</span>
              <button className="navbar-toggler left-0" type="button">
                <i className="fa fa-shopping-cart text-black  hover:text-black"></i>
              </button>
            </Link>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
        
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
