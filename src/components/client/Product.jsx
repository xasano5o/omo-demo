import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useGetProductIdQuery } from '../../redux/slice/client/getProduct/index.js';

function Product() {
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductIdQuery({ id: id });

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
                                    {product?.image ? (
                                        <Carousel
                                            className=''
                                            animationHandler={true}
                                            infiniteLoop={true}
                                        >
                                            <div className="">
                                                <img src={product?.image} alt={`Image`} className='object-cover' />
                                            </div>
                                            {product.images.map((item, index) => (
                                                <div key={index} className="">
                                                    <img src={item?.image} alt={`Image ${index}`} className='object-cover' />
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
                                                {product?.title}
                                            </h5>
                                            <span className="text-muted text-capitalize">{product?.category}</span>
                                            <div className="price d-flex flex-row align-items-center">
                                                <big className="display-6"><b>{product?.price}</b></big>
                                            </div>
                                        </div>
                                        <p className="text-muted whitespace-pre-wrap break-words">{product?.description}</p>
                                        <div className="cart mt-4 align-items-center"> <button className="btn btn-outline-primary text-uppercase mr-2 px-4">Buy</button> </div>
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