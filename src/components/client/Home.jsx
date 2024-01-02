import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetBannersQuery } from "../../redux/slice/client/banner/index.js";
import Products from "./Products";
import { CategorySlide } from "./CategorySilide.jsx";

const Home = () => {
  const { data } = useGetBannersQuery();
  return (
    <div className="">
      <div className="container px-0">
        <Carousel className="z" autoPlay={true} infiniteLoop={true} showArrows={true}>
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

        <CategorySlide />
        <Products />
      </div>
    </div>
  );
};

export default Home;
