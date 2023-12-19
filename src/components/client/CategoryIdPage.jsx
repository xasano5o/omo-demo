import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductIdQuery } from "../../redux/slice/client/category";
import { useCreateBasketMutation } from "../../redux/slice/client/basket";

const CategoryId = () => {
  const { id } = useParams();
  const { data: products } = useGetProductIdQuery({ id: id });
  const [procate, setProcate] = useState(products);
  const [createBasket, { isLoading: createIsloading, isSuccess }] = useCreateBasketMutation()


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

  return (
    <div className="container mx-auto mt-20">
      <div className="col-md-13 py-md-3">
        <div className="row">
          {products?.map((product) => (
            <div className="col-6 col-md-3 col-lg-3 mb-1" key={product?.id}>
              <div className="card h-100">
                <NavLink to={`/product/${product?.id}`}>
                  <img
                    src={product?.image}
                    className=""
                    style={{ height: "300px", width: "", objectFit: "contain" }}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryId;
