import React from 'react';
import { CategorySilide } from './CategorySilide.jsx';
import Products from './Products';
import Diskount from './discount/Diskount.jsx';
import { useGetBannersQuery } from '../../redux/slice/client/banner/index.js';

const Home = () => {
    const {data}=useGetBannersQuery()
    return (
        <>
            <div className="container px-0" style={{ marginTop: "66px" }}>
                <div id="OmoFood" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {data?.map((item) => {
                            return <>
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={item?.image} className="d-block w-100 h-96 object-contain" alt="..." />
                            </div>

                            </>
                        })}

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#OmoFood" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#OmoFood" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* <Diskount /> */}
                <CategorySilide />
                <Products />
            </div>
        </>
    )
}

export default Home;