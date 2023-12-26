import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateBasketMutation, useDeleteBasketMutation, useIncrementMutation } from "../../redux/slice/client/basket";
import { useGetProductIdQuery } from "../../redux/slice/client/category";
import Loading from "./Loading";
import Savat from "../../savat.jpg"

const CategoryId = () => {
  const { id } = useParams();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const { data: products,isLoading,refetch } = useGetProductIdQuery({ id: id });
  console.log(isLoading);
  const [procate, setProcate] = useState(products);
  const [createBasket, { isLoading: createIsloading, isSuccess }] =
    useCreateBasketMutation();

  const token = localStorage.getItem("user");
  if (token) {
    axios.post(
      "users/check_token/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
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
    } catch (error) {  }
    const id = value?.id
    if (value?.amount == 0) {
      deleteBasket({ id });
    }
    refetch()
  };
if(isLoading){
  return <Loading/>
}

  return (
    <div className="container mx-auto mt-3">
      <div className="col-md-13 py-md-3">
        <div className="row">
          {products && products?.length > 0 ? (
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
            ))
          ) : (
            <section className="bg-white dark:bg-gray-900 justify-center mx-auto items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
               <img src={Savat} className="" alt="" />
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-black">
                  Mahsulorlar hozircha yoq!
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Kechirasiz hozirda adminlar tominidan korib chiqiladi
                </p>
                <Link
                  to="/"
                  className="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                >
                  Asosiy sahifaga qaytish
                </Link>
              </div>
            </div>
          </section>
          )}
        
        </div>
      </div>
    </div>
  );
};

export default CategoryId;
