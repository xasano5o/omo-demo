import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useGetProductCatgoriQuery, useGetProductIdQuery } from '../../redux/slice/client/getProduct/index.js';
import { IoArrowBack } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Product() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { data: product, isLoading } = useGetProductIdQuery({ id: id });
    const [rotate, setRotate] = useState(false);
    const [count, setCount] = useState(1);
    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    const minusCount = () => {
        if (count > 1) {
            setCount((prev) => prev - 1);
        }
    };



    // useEffect(() => {
    //     const getProduct = async () => {
    //         setLoading(true);
    //         // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    //         // const data = await response.json();
    //         const {data,isLoading } =useGetProductIdQuery({ID:id});
    //         setProduct(data);
    //         setLoading(false);
    //     }
    //     getProduct();

    // }, [id]);

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
                                        <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">                                                <Skeleton height={30} width={150} />
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
        )
    }

    const ShowDetails = () => {
        <Carousel
            animationHandler={true}
            infiniteLoop={true}
        >
            {product?.images.map((item, index) => (
                <div key={index}>
                    <img src={item?.image} alt={`Image ${index}`} />
                </div>
            ))}
        </Carousel>
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
                                    {product?.images.length > 0 ? (
                                        <Carousel
                                            className=''
                                            animationHandler={true}
                                            infiniteLoop={true}
                                        >
                                            {product.images.map((item, index) => (
                                                <div key={index} className='md:h-96'>
                                                    <img src={item?.image} alt={`Image ${index}`} />
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
                                            <h5 className="text-uppercase">
                                                {product.title}
                                            </h5>
                                            <span className="text-muted text-capitalize">{product.category}</span>
                                            <div className="price d-flex flex-row align-items-center">
                                                <big className="display-6"><b>{product?.price}</b></big>
                                            </div>
                                        </div>
                                        <p className="text-muted whitespace-pre-wrap break-words">{product?.description}</p>
                                        <div className="cart mt-4 align-items-center"> <button className="btn btn-outline-dark text-uppercase mr-2 px-4">Buy</button> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>

                {isLoading ? <Loading /> : <ShowDetails />}

            </div>
        </>
    )
}

export default Product