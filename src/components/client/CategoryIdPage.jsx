import React, { useState } from 'react';
import { useGetProductIdQuery } from '../../redux/slice/client/category';
import { NavLink, useParams } from 'react-router-dom';
import { useGetProductCatgoriQuery } from '../../redux/slice/client/getProduct';

const CategoryId = () => {
    const { id } = useParams()
    const { data: products } = useGetProductCatgoriQuery({ id: id })
    const [procate, setProcate] = useState(products)
    
    console.log(products, "sa");
    console.log(id, "idpage");

    return (
        <div>
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
                                        <div className="m-3"><b>${product?.price}</b></div>
                                        <NavLink className="" to={`/products/${product?.id}`}>
                                            <button className="btn btn-sm m-3 border-primary">
                                                <i className="fa fa-arrow-right text-muted"></i>
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                                <button className="btn btn-sm m-3 border-primary">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryId;
