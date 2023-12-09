import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { useGetProductIdQuery } from '../../redux/slice/client/getProduct/index.js';
import { IoArrowBack } from "react-icons/io5";

function Product() {
    const { id } = useParams();
    // const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const { data: product, isLoading } = useGetProductIdQuery({ id: id });
    // setProduct(product_object);
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
        return (
            <>
                <section className="py-10 font-poppins dark:bg-gray-800">
                    <Link to={"/"} className='no-underline'>
                    
                            <h1 className="text-gray-600 text-xl flex items-center dark:text-gray-400">
                        <IoArrowBack /> 
                              Ortga
                            </h1>
                    </Link>
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-0 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-96">
                                        <a className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                                                </path>
                                            </svg>
                                        </a>
                                        <img className="object-contain w-full lg:h-full" src={product
                                            ?.image} alt="" />
                                        <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                                </path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="flex-wrap hidden -mx-2 md:flex">
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <img className="object-contain w-full lg:h-28" src={product?.image} alt="" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <img className="object-contain w-full lg:h-28" src={product?.image} alt="" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <img className="object-contain w-full lg:h-28" src={product?.image} alt="" />
                                            </a>
                                        </div>
                                        <div className="w-1/2 p-2 sm:w-1/4">
                                            <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                                <img className="object-contain w-full lg:h-28" src={product?.image} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6 ">

                                        <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {product?.title}
                                        </h2>

                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                            <span>{product?.price}</span>
                                        </p>
                                    </div>

                                    <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-base text-gray-600 dark:text-gray-400">{product?.amount} {product?.amount_measure}</span>
                                        <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {product?.description}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mb-6 "></div>
                                    <div className="flex flex-wrap items-center mb-6">
                                        <div className="mb-4 mr-4 lg:mb-0">
                                            <div className="w-28">
                                                <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                    </button>
                                                    <input type="number" className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1" />
                                                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 lg:mb-0">
                                            <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                                    </path>
                                                </svg>
                                            </button>
                                            
                                        </div>
                                        <Link to="#" className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
                                            Add to cart
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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