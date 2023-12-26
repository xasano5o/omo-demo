import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { useCreateBasketMutation, useDeleteBasketMutation,  useGetProductQuery, useIncrementMutation } from "../../redux/slice/client/basket/index.js";
import { toast } from "react-toastify";
import axios from "axios";



function Products() {

  //  redux
  const { data: product, isLoading, refetch } = useGetProductQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const [createBasket, { isLoading: createIsloading, isSuccess }] = useCreateBasketMutation();

  const token = localStorage.getItem("user");


  function sendRequest() {
    axios.post(
      "users/check_token/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
  }


  if (token) {
    // Birinchi marta surovni yuborish

    // Keyin har 24 soatda bir avtomatik ravishda yuborish
    setInterval(() => {
      sendRequest();
    }, 24 * 60 * 60 * 1000); // 24 soat = 24 * 60 minut * 60 sekund * 1000 millisekund
  } else {
    axios.get("users/get_token/").then((res) => {
      const token = res.data.access_token;
      localStorage.setItem("user", token);
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

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
    refetch()
  };

  const increment = async (value) => {
    const formData = new FormData();
    formData.append("amount", value?.amount + 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) {
    }
    refetch()
  };
  const decrement = async (value) => {
    const formData = new FormData();
    formData.append("amount", value.amount - 1);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) { }
    const id = value?.id
    if (value?.amount == 0) {
      deleteBasket({ id });
    }
    refetch()
  };

  // Remaining time state
  const [remainingTime, setRemainingTime] = useState(null);

  const calculateTimeRemaining = (endDateString) => {
    const endDateObject = new Date(endDateString);
    const now = new Date();
    const timeDifference = endDateObject - now;

    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hoursRemaining, minutesRemaining, secondsRemaining };
  };

  // useEffect(() => {
  //   // Calculate and update remaining time for each product with a discount
  //   const updatedProducts = filter?.map((product) => {
  //     if (product.discount?.end_date) {
  //       const { hoursRemaining, minutesRemaining, secondsRemaining } = calculateTimeRemaining(product.discount.end_date);
  //       return { ...product, remainingTime: { hoursRemaining, minutesRemaining, secondsRemaining } };
  //     }
  //     return product;
  //   });

  //   setFilter(updatedProducts);

  //   // Update remaining time every second
  //   const intervalId = setInterval(() => {
  //     const updatedProducts = filter?.map((product) => {
  //       if (product.discount?.end_date) {
  //         const { hoursRemaining, minutesRemaining, secondsRemaining } = calculateTimeRemaining(product.discount.end_date);
  //         return { ...product, remainingTime: { hoursRemaining, minutesRemaining, secondsRemaining } };
  //       }
  //       return product;
  //     });

  //     setFilter(updatedProducts);
  //   }, 1000);

  //   return () => clearInterval(intervalId); // Clear interval on component unmount

  // }, [filter]);


  const Loading = () => {
    return (
      <>
        <div className="col-md-13 py-md-3">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const filterProduct = (category) => {
    const updateList = product?.filter((x) => x?.category === category);
    setFilter(updateList);
  };

  const ShowProducts = () => {
    return (
      <>
        <h3>Mahsulotlarimiz</h3>
        <div className="col-md-13 py-md-3">
          <div className="row">
            {filter?.map((product) => {
              const formatDate = (dateString) => {
                const options = {
                  hour12: false,
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                };
                const dateObject = new Date(dateString);
                return dateObject.toLocaleString('en-US', options);
              };
              const formattedStartDate = product.discount.start_date ? formatDate(product.discount.start_date) : '';
              const formattedEndDate = product.discount.end_date ? formatDate(product.discount.end_date) : '';

              console.log(`Start Date: ${formattedStartDate}`);
              console.log(`End Date: ${formattedEndDate}`);

              // Use remaining time from state with default values
              const { hoursRemaining = 0, minutesRemaining = 0, secondsRemaining = 0 } = product.remainingTime || {};
              console.log(`Remaining Time: ${hoursRemaining} hours, ${minutesRemaining} minutes, ${secondsRemaining} seconds`);



              return (
                <div
                  className="col-6 col-md-3  col-lg-3 mb-1"
                  key={product?.id}
                >
                  <div className="card h-100">
                    <NavLink to={`/product/${product?.id}`}>
                      <img
                        src={product?.image}
                        className="aspect-square object-cover w-full h-[300px]"
                        alt={product?.title}
                      />
                    </NavLink>

                    <div className="m-3 mb-0 flex justify-between">
                      <small className="card-title">{product?.title}</small>
                      {/* {hoursRemaining !== undefined && (
                        <small>
                          {`${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`}
                        </small>
                      )} */}
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="m-3 flex flex-col">
                          {
                            product?.discount?.product_discount_price ? <b className="text-xm">{product?.discount?.product_discount_price?.toLocaleString("ru-Ru")} so'm</b> : ''
                          }
                          {
                            product?.discount?.product_discount_price ? <del> {product?.price.toLocaleString("ru-Ru")} so'm</del> : <b className="text-xm">{product?.price.toLocaleString("ru-Ru")} so'm</b>
                          }
                        </div>
                        <NavLink to={`/product/${product?.id}`}>
                          <button className="btn btn-sm m-3 border-primary">
                            <span className="fa fa-arrow-right text-muted" />
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    {
                      product?.basket?.amount
                        ?
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
                        // If false, render a button to add the product to the basket
                        : <button
                          className="btn btn-sm m-3 border-primary"
                          onClick={() => addData(product)}
                        >
                          Savatga qo'shish
                        </button>
                    }

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row">{isLoading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
}

export default Products;
