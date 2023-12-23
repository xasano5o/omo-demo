import React from "react";
import { useGetBannersQuery } from "../../redux/slice/client/banner/index.js";
import { CategorySilide } from "./CategorySilide.jsx";
import Products from "./Products";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const { data } = useGetBannersQuery();
  return (
    <>
      <div className="container px-0" style={{ marginTop: "86px" }}>
        <Carousel className="" autoPlay={true} infiniteLoop={true} showArrows={true}>
          {data?.map((item) => {
            return (
              <>
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src={item?.image}
                    className="h-96 object-contain w-full"
                    alt="..."
                  />
                </div>
              </>
            );
          })}
        </Carousel>

        <CategorySilide />
        <Products />
      </div>
    </>
  );
};

export default Home;
