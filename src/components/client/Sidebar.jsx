import React from 'react';
import { useGetCategoryQuery } from '../../redux/slice/client/category/index.js';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../redux/slice/client/getProduct/index.js';

const Sidebar = () => {
  const { data } = useGetCategoryQuery()
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex w-full">
        <div className="w-full">
          <div className="space-y-1">
            {data?.map((value, index) => (
              <a
                key={index}
                className={`flex items-center no-underline text-black    justify-between p-4 bg-white border-t border-b border-gray-300 ${
                  index === 0 ? 'bg-gray-200' : ''
                }`}
                href={`#list-${value?.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/categories/${value?.slug}`);
                }}
              >
                <img
                  className="rounded-full w-10 h-10 border-2 border-gray-300"
                  src={value.thumbnail_image}
                  alt="as"
                />
                <span className="ml-2">{value?.title}</span>
              </a>
            ))}

          </div>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item no-underline" href="#scrollspyHeading3">
                Third
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#scrollspyHeading4">
                Fourth
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#scrollspyHeading5">
                Fifth
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
