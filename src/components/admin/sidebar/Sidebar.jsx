import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarAdmin } from '../../../mock/adminSidebar';


const Sidebar = () => {
  const [isSidebarHidden, setSidebarVisibility] = useState(false);
 const navigate = useNavigate()

  return (
    <>
      <div className="bg-white">
        <div
          className={`sidebar h-[100vh] flex flex-col justify-between  lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-white ${isSidebarHidden ? 'hidden' : ''}`}
        >
          <div>

          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <Link to={"/admin"} className='no-underline'>
                <h1 className='text-black hover:text-black]'>Omo Food</h1>
              </Link>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>

          {SidebarAdmin?.map((value) => (
              <div
              onClick={() => navigate(`/admin${value.path}`)}
                key={value.title} // Don't forget to add a unique key
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#e0dede] text-white"
              >
                <i className="bi bi-house-door-fill"></i>
                <span          className="text-[15px] ml-4 text-black font-bold">{value.title}</span>
              </div>
            ))}
       </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>

     
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#e0dede] text-white"
          >
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-black font-bold">Logout</span>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
