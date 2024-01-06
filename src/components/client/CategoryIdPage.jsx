import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateBasketMutation,
  useDeleteBasketMutation,
  useIncrementMutation,
} from "../../redux/slice/client/basket";
import { useGetProductIdQuery } from "../../redux/slice/client/category";
import Savat from "../../savat.jpg";
import Loading from "./Loading";
import Skeleton from "react-loading-skeleton";
import ProductNotfound from "./ProductNotfound";
import { FaCartPlus } from "react-icons/fa";

const CategoryId = () => {
  const Loading = () => {
    return (
      <div className="container mx-auto">
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
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
            <div className="col-6 col-md-6 col-lg-3 mb-3">
              <Skeleton height={400} width={"100%"} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const { id } = useParams();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment,{isLoading:disl}] = useIncrementMutation();
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductIdQuery({ id: id });
  const [procate, setProcate] = useState(products);
  const [createBasket, { isLoading: createIsloading, isSuccess }] =
    useCreateBasketMutation();

  const token = localStorage.getItem("user");
  if (token) {
    axios.post("users/check_token/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
  } else {
    axios.get("users/get_token/").then((res) => {
      const token = res.data?.access_token;
      localStorage.setItem("user", token);
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  useEffect(() => {
    setFilter(products);
  }, [products]);
  const [filter, setFilter] = useState(products);

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
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-3">
      <div className="col-md-13 py-md-3">
        <div className="row">
          {

            products && products?.length > 0 ? (
              products?.map((product) => (
                <div className="col-6 col-md-3 col-lg-3 mb-1" key={product?.id}>
                  <div className="card h-100">
                    <NavLink to={`/product/${product?.id}`}>
                      <img
                        src={product?.image}
                        className="aspect-square object-cover w-full h-[300px]"
                        alt={product?.title}
                      />
                    </NavLink>
                    <div className="m-3 mb-0">
                      <small className="card-title">{product?.title}</small>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="m-3">
                          <b>{product?.price.toLocaleString("ru-Ru")}</b>
                        </div>
                        <NavLink className="" to={`/product/${product?.id}`}>
                          <button className="btn btn-sm m-3 border-primary">
                            <i className="fa fa-arrow-right text-muted"></i>
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    {product?.basket?.amount ? (
                      <div className="flex py-4 justify-around items-center border-gray-100">
                        <span
                    disabled={disl&&true}

                          onClick={() => decrement(product.basket)}
                          className="cursor-pointer rounded-l py-1 bg-blue-700 text-white px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
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
                    disabled={disl&&true}

                          onClick={() => increment(product?.basket)}
                          className="cursor-pointer rounded-r py-1 bg-blue-700 text-white px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                    ) : (
                      <div className=" text-center items-center justify-center flex mb-2">
                        <button
                          disabled={createIsloading && true}
                          onClick={() => addData(product)} className="bg-blue-700 flex gap-2 hover:bg-blue-800 text-white font-bold border px-4 py-2 border-blue-700 rounded">
                          <FaCartPlus className=" cursor-pointer text-2xl" /> Savatga Qo'shish
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <ProductNotfound />
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryId;
