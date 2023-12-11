import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/slice/client/getProduct/index.js';

function Products() {
    const { data: product, isLoading, } = useGetProductQuery();
    const [filter, setFilter] = useState(product);

    useEffect(() => {
        setFilter(product);
    }, [product]);
    const Loading = () => {
        return (
            <>

                <div className="col-md-13 py-md-3">
                    <div className="row">
                        <div className="col-4 col-md-4 col-lg-3 mb-3">
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
            </>
        )
    }

    const filterProduct = (category) => {
        const updateList = product?.filter((x) => x?.category === category);
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="col-md-5 my-3">

                    <div className="position-sticky" style={{ top: "100px" }}>
                        <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => setFilter(product)}>Top maxsulotlar</button>
                        <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("women's clothing")}>Aralash maxsulotlar</button>
                        <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("men's clothing")}>Skidkadgi maxsulotlar</button>
                        <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                        <button className="btn btn-outline-dark m-1 btn-sm" onClick={() => filterProduct("electronics")}>Electronics</button>
                    </div>

                </div>

                <div className="col-md-13 py-md-3">
                    <div className="row">
                        {filter?.map((product) => {
                            return (
                                <div className="col-6 col-md-3  col-lg-3 mb-1" key={product?.id}>
                                    <div className="card h-100">
                                        <NavLink to={`/product/${product?.id}`}>
                                            <img src={product?.image} className="" style={{ height: "300px", width: "", objectFit: "contain" }} alt={product?.title} />

                                        </NavLink>
                                        <div className="m-3 mb-0">
                                            <small className="card-title">{product?.title}</small>
                                        </div>
                                        
                                        <div style={{ marginTop: "auto" }}>
                                            
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="m-3"><b>${product?.price}</b></div>
                                          
                                                <NavLink className="" to={`/product/${product?.id}`}>
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
                            );
                        })}
                    </div>
                </div>

            </>
        )
    }

    return (
        <div className="container">
            <div className="row">
                {isLoading ? <Loading /> : <ShowProducts />}
            </div>
        </div>
    )
}

export default Products