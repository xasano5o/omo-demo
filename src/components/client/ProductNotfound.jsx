import React from "react";
import { Link } from "react-router-dom";
import Savat from "../../savat.jpg";

const ProductNotfound = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 justify-center mx-auto items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <img src={Savat} className="md:ml-[200px] " alt={"salom"} />
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-black">
              Mahsulotlar hozircha yoq!
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
    </div>
  );
};

export default ProductNotfound;
