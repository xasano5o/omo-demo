import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateBasketMutation, useDeleteBasketMutation, useIncrementMutation } from "../../redux/slice/client/basket/index.js";
import { useGetProductIdQuery } from "../../redux/slice/client/getProduct/index.js";
import { CategorySlide } from "./CategorySilide.jsx";
// import { useGetProductQuery } from "../../redux/slice/client/getProduct/index.js";

function Product() {
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const { id } = useParams();
  const { data: product, isLoading, refetch } = useGetProductIdQuery({ id: id });
  const [createBasket, { isLoading: createIsloading, isSuccess }] =
    useCreateBasketMutation();

  // const token = localStorage.getItem("user");
  // if (token) {

  // } else {
  //   axios.get("users/get_token/").then((res) => {
  //     const token = res.data.access_token;
  //     localStorage.setItem("user", token);
  //   });
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1500);
  // }

  useEffect(() => {
    setFilter(product);
  }, [product]);
  const [filter, setFilter] = useState(product);

  const addData = async (productd) => {
    const formData = new FormData();
    formData.append("amount", 1);
    formData.append("product", productd.id);
    try {
      await createBasket(formData).unwrap();
      toast.success(`maxsulod  qushildi`);
    } catch (error) {
      toast.error(`Failed to add category `);
    }
    refetch();
  };

  const increment = async (value) => {
    const formData = new FormData();
    formData.append("amount", value?.amount + 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) { }
    refetch();
  };
  const decrement = async (value) => {
    const formData = new FormData();
    formData.append("amount", value.amount - 1);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) { }
    const id = value?.id;
    if (value?.amount == 0) {
      deleteBasket({ id });
    }
    refetch();
  };

  const Loading = () => {
    return (
      <>
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <NavLink className="text-decoration-none text-dark" to={`/`}>
              <div className="d-flex align-items-center m-3">
                <Skeleton height={20} width={50} />
              </div>
            </NavLink>
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <Skeleton height={300} width={250} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border p-4">
                    <div className="mt-4 mb-3">
                      {" "}
                      <span className="text-uppercase text-muted brand">
                        {" "}
                        <Skeleton height={30} width={150} />
                      </span>
                      <h5 className="text-uppercase">
                        <Skeleton height={30} width={200} />
                      </h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">
                          <Skeleton height={20} width={70} />
                          <Skeleton height={30} width={100} />
                        </span>
                      </div>
                    </div>
                    <p className="about">
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                      <Skeleton height={10} width={300} />
                    </p>
                    <div className="cart mt-4 align-items-center">
                      <Skeleton height={40} width={150} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowDetails = () => {
    return (
      //   <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"/>
      <>
        <div className="row d-flex justify-content-center w-full">
          <div className="col-md-12">
            <NavLink className="text-decoration-none text-dark" to={`/`}>
              <div className="d-flex align-items-center m-3">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-1">&nbsp;Back</span>
              </div>
            </NavLink>
            <div>
              <div className="row">
                <div className="col-md-6">
                  {product?.image ? (
                    <Carousel
                      className="w-full"
                      animationHandler={true}
                      infiniteLoop={true}
                    >
                      <div className="">
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="object-cover w-full"
                        />
                      </div>
                      {product.images.map((item, index) => (
                        <div key={index} className="">
                          <img
                            src={item?.image}
                            alt={`Image ${index}`}
                            className="object-cover w-full"
                          />
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <h1>Mahsulot rasmlari hozircha yoq</h1>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="w-full border p-4 shadow-md">
                    <div className="mt-4 mb-3">
                      <h5 className="text-uppercase">{product?.title}</h5>
                      {console.log(
                        (2500).toLocaleString("ru-Ru", {
                          style: "currency",
                          currency: "USD",
                        })
                      )}
                      <span className="text-capitalize text-orange-600">
                        {product?.category?.title}
                      </span>
                      <div className="price d-flex flex-row align-items-center">
                        <big className="display-6">

                          <b>{product?.price.toLocaleString("ru-Ru")}</b>so'm
                        </big>
                      </div>
                      <div className="price d-flex flex-row align-items-center">
                        <big className="display-6">
                          <b>
                            {product?.amount}{" "}
                            {product?.amount_measure.toLocaleString("ru-Ru")}
                          </b>
                        </big>
                      </div>
                    </div>
                    <p className="text-muted whitespace-pre-wrap break-words">
                      {product?.description}
                    </p>
                    {product?.basket?.amount ? (
                      <div className="flex py-4 justify-around items-center border-gray-100">
                        <span
                          onClick={() => decrement(product.basket)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="text"
                          value={product.basket?.amount}
                          min="1"
                        />
                        <span
                          onClick={() => increment(product?.basket)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                    ) : (
                      // If false, render a button to add the product to the basket
                      <button
                        className="btn btn-sm m-3 border-primary"
                        onClick={() => addData(product)}
                      >
                        Savatga qo'shish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CategorySlide />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
        {isLoading ? <Loading /> : <ShowDetails />}
      </div>
    </>
  );
}

export default Product;
