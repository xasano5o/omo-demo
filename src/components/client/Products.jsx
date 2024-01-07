import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import {
  useCreateBasketMutation,
  useDeleteBasketMutation,
  useGetProductQuery,
  useIncrementMutation,
} from "../../redux/slice/client/basket/index.js";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";

const Time = ({ timeLeft }) => (
  <div className='flex items-center'>
    <span className='flex flex-col items-center'>{timeLeft?.days}&nbsp;:&nbsp;</span>
    <span className='flex flex-col items-center'>{timeLeft?.hours}&nbsp;:&nbsp;</span>
    <span className='flex flex-col items-center'>{timeLeft?.minutes}&nbsp;:&nbsp;</span>
    <span className='flex flex-col items-center'>{timeLeft?.seconds}&nbsp;</span>
  </div>
);

function Products() {
  const { data: products, isLoading, refetch } = useGetProductQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [increment,{isLoading:disl}] = useIncrementMutation();
  const [createBasket,{isLoading:disabled}] = useCreateBasketMutation();

  const [productTimeLeft, setProductTimeLeft] = useState({});
  const intervalRef = useRef(null);

  const token = localStorage.getItem("user");
  if (token) {

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
    const calculateTimeLeft = () => {
      products?.forEach((product) => {
        const backendSeconds = parseFloat(product?.discount?.time_left);
        if (!isNaN(backendSeconds)) {
          const diffTime = backendSeconds * 1000;
          const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
          const hours = Math.floor((diffTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          const minutes = Math.floor((diffTime % (60 * 60 * 1000)) / (60 * 1000));
          const secs = Math.floor((diffTime % (60 * 1000)) / 1000);

          setProductTimeLeft((prev) => ({
            ...prev,
            [product.id]: { days, hours, minutes, seconds: secs },
          }));
        } else {

        }
      });
    };

    // Clear the existing interval before setting a new one
    clearInterval(intervalRef.current);

    // Set the new interval
    intervalRef.current = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [products]);

  const addData = async (productData) => {
    const formData = new FormData();
    formData.append("amount", 1);
    formData.append("product", productData.id);

    try {
      await createBasket(formData).unwrap();
      toast.success(`maxsulod qushildi`);
    } catch (error) {
      toast.error(`Failed to add category`);
    }
    refetch();
  };

  const updateBasket = async (value, amount) => {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("id", value.id);

    try {
      await increment(formData).unwrap();
    } catch (error) { }
    refetch();
  };

  const decrement = async (value) => {
    const amount = value.amount - 1;

    if (amount === 0) {
      const id = value.id;
      deleteBasket({ id });
    } else {
      updateBasket(value, amount);
    }
    refetch();
  };

  const Loading = () => (
    <div className="col-md-13 py-md-3">
      <div className="row">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="col-6 col-md-6 col-lg-3 mb-3">
            <Skeleton height={400} width={"100%"} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowProducts = () => (
    <>
      <h3>Maxsulotlarimiz</h3>
      <div className="col-md-13 py-md-3">
        <div className="row">
          {products?.map((product,index) => (
            <div key={index+1}  className="col-6 col-md-3 col-lg-3 mb-1" key={product?.id}>
              <div className="card h-100">
                <NavLink to={`/product/${product?.id}`}>
                  <img src={product?.image} className="aspect-square object-cover w-full h-[300px]" alt={product?.title} />
                </NavLink>

                <div className="m-3 mb-0 flex justify-between items-center">
                  <small className="card-title">{product?.title}</small>
                  {product?.discount?.time_left && product?.discount?.time_left > 0 && <Time timeLeft={productTimeLeft[product.id]} />}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="m-3 flex flex-col">
                      {product?.discount?.product_discount_price ? (
                        <>
                          <b className="text-xm">{product?.discount?.product_discount_price?.toLocaleString("ru-Ru")} so'm</b>
                          <del>{product?.price.toLocaleString("ru-Ru")} so'm</del>
                        </>
                      ) : (
                        <b className="text-xm">{product?.price.toLocaleString("ru-Ru")} so'm</b>
                      )}
                    </div>
                    <NavLink to={`/product/${product?.id}`}>
                      <button className="btn btn-sm m-3 border-primary">
                        <span className="fa fa-arrow-right text-muted" />
                      </button>
                    </NavLink>
                  </div>
                </div>

                {product?.basket?.amount ? (
                  <div className="flex py-4 justify-around items-center border-gray-100">
                    <span
                    disabled={disl&&true}
                      onClick={() => decrement(product?.basket)}
                      className="cursor-pointer rounded-l bg-blue-700 text-white py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-8 border text-center  text-xs outline-none"
                      type="text"
                      value={product?.basket?.amount}
                      min="1"
                    />
                    <span
                    disabled={disl&&true}
                      onClick={() => updateBasket(product?.basket, product?.basket?.amount + 1)}
                      className="cursor-pointer rounded-r bg-blue-700 text-white py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>
                ) : (
                  <div className=" text-center items-center justify-center flex mb-2">
                    <button
                      disabled={ disabled &&true}
                      onClick={() => addData(product)} className="bg-blue-700 flex gap-2 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      <FaCartPlus className=" cursor-pointer text-2xl" />Savatga Qo'shish
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="container">
      <div className="row">{isLoading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
}

export default Products;
