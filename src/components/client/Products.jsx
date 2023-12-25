import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { useGetProductQuery } from "../../redux/slice/client/getProduct/index.js";
import { useCreateBasketMutation, useDeleteBasketMutation, useGetBasketQuery, useIncrementMutation } from "../../redux/slice/client/basket/index.js";
import { toast } from "react-toastify";



function Products() {
  const { data: product, isLoading, refetch } = useGetProductQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const [createBasket, { isLoading: createIsloading, isSuccess }] = useCreateBasketMutation();


  // const token = localStorage.getItem("user");
  // if (token) {
  //   axios.post(
  //     "users/check_token/",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("user")}`,
  //       },
  //     }
  //   );
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

                    <div className="m-3 mb-0">
                      <small className="card-title">{product?.title}</small>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="m-3">
                          <b>{product?.price.toLocaleString("ru-Ru")} so'm</b>
                        </div>
                        <NavLink className="" to={`/product/${product?.id}`}>
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
