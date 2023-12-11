import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  const menus = [
    { name: "Dashboard", link: "/dashbord", icon: GoHome },
    { name: "Product", link: "/product", icon: MdOutlineDashboard },
    { name: "Discount", link: "/discount", icon: TbReportAnalytics },
    { name: "Categorie", link: "/categorie", icon: TbReportAnalytics },
    { name: "Subcategorie", link: "/subcategorie", icon: TbReportAnalytics, margin: true },
    
    { name: "Log out", link: "", icon: FaRegUser, margin: true },

  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-white min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
      >

        <div className="py-3 flex justify-end text-center items-center gap-6">


          <Link to={"/admin/home"} className={`no-underline ${open ? "block" : "hidden"}`} >
            <h1 className="text-black">Omo Food</h1>

          </Link>

          {
            open ? (
              <FiArrowRight
                className="cursor-pointer text-black text-2xl"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <FiArrowLeft
                className="cursor-pointer text-black text-2xl" // Adjust the font size here
                onClick={() => setOpen(!open)}
              />
            )
          }

        </div>
        <div className="mt-4 flex flex-col gap-4 relative">

          {menus?.map((menu, i) => (
            <div className=""
              onClick={() => navigate(`/admin${menu.link}/`)}
            >

              <Link
                to={menu?.link}
                key={i}
                className={` ${menu?.margin && ""
                  } group flex items-center text-sm no-underline text-center  gap-3.5 font-medium p-2 rounded-md`}
              >
                <h1 className="text-xl text-black">{React.createElement(menu?.icon)}
                </h1>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`text-xl text-black duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu?.name}
                </h2>
              </Link>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Home;