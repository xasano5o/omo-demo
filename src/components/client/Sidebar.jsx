import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCategoryQuery } from '../../redux/slice/client/category/index.js';

const Sidebar = () => {
  const { data } = useGetCategoryQuery()
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex w-full">
        <div className="w-full">
          <div className="space-y-1 h-[100vh] overflow-y-auto">
            {data?.map((value, index) => (
              <Link
                key={index}
                className={`flex items-center no-underline text-black justify-between ${index === 0 ? 'bg-gray-200' : ''
                  }`}
                to={`${value?.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/categories/${value?.id}`);
                }}
              >
                <div className="w-full text-black">
                  <button type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-gray-200 shadow-md rounded-t-lg hover:bg-gray-100">
                    <img
                      className="rounded-full w-10 object-cover h-10 border-gray-300"
                      src={value?.image}
                      alt="as"
                    />
                    <span className="ml-2">{value?.title}</span>
                  </button>
                </div>
              </Link>
            ))}
            {data?.length === 0 && <h1>Mahsulotlar Kategoriyasi Yoq</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
