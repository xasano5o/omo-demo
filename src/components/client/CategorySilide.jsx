import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../redux/slice/client/category";
import ProductNotfound from "./ProductNotfound";

export const CategorySilide = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const { data, isLoading, isError, isSuccess } = useGetCategoryQuery();
  const navigate = useNavigate();

  return (
    <div className="mt-5 container mx-auto">
      <h3 className="">Mahsulotlar turlari</h3>
      {data && data?.length > false ? (
        <Carousel
          itemclassName="slideitem"
          sliderclassName="SliderclassNameCustom"
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          draggable={true}
        >
          {data?.map((item) => {
            return (
              <div>
                <div
                  className="mt-12"
                  style={{ width: "150px", height: "200px" }}
                >
                  <Link
                    to={`${item?.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/categories/${item?.id}`);
                    }}
                  >
                    <img
                      src={item?.image}
                      className="card-img-top rounded-circle"
                      style={{
                        height: "128px",
                        width: "128px",
                        objectFit: "cover",
                      }}
                      alt={item?.title}
                    />
                  </Link>
                  <div className="card-body">
                    <p className="card-text text-[13px] font-medium">
                      {item?.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <ProductNotfound />
      )}
    </div>
  );
};
