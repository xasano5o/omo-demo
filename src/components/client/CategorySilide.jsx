import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetCategoryQuery } from "../../redux/slice/client/category/index.js";

export const CategorySilide = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    const { data, isLoading,  isSuccess } = useGetCategoryQuery();
    return (
        <div className="my-5">
            <div className="mt-12">
                {data ? (
                    <Carousel responsive={responsive} infinite={true} autoPlay={true}>
                        {data?.map((item) => {
                            return (
                                <div >
                                    <div className="d-flex gap-2 card h-100 " key={item?.id}>
                                        <img src={item?.thumbnail_image} alt="" style={{
                                            height: "300px",
                                            width: "auto",
                                            objectFit: "contain",
                                        }} />
                                        <div className="m-3 mb-0">
                                            <h1 className="card-title">{item?.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Carousel>
                ) : (
                    <h1>Hech vaqo yo'q</h1>
                )}
            </div>
        </div>
    );
};
