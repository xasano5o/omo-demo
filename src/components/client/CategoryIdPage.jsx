import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateBasketMutation } from "../../redux/slice/client/basket";
import { useGetProductIdQuery } from "../../redux/slice/client/category";
import Loading from "./Loading";

const CategoryId = () => {
  const { id } = useParams();
  const { data: products,isLoading } = useGetProductIdQuery({ id: id });
  console.log(isLoading);
  const [procate, setProcate] = useState(products);
  const [createBasket, { isLoading: createIsloading, isSuccess }] =
    useCreateBasketMutation();

  const token = localStorage.getItem("user");
  if (token) {
    axios.post(
      "users/check_token/",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
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
    setFilter(products);
  }, [products]);
  const [filter, setFilter] = useState(products);

  const addData = async (products) => {
    const formData = new FormData();
    formData.append("amount", 1);
    formData.append("product", products.id);
    try {
      await createBasket(formData).unwrap();
      toast.success(`maxsulod  qushildi`);
    } catch (error) {
      toast.error(`Failed to add category `);
    }
  };
  console.log(products, "sa");
  console.log(id, "idpage");

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
                  <button
                    className="btn btn-sm m-3 border-primary"
                    onClick={() => addData(product)}
                  >
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            ))
          ) : (
            <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                  [...]
                </h1>
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
