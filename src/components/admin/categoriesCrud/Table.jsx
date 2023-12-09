import React, { useState } from 'react';
import AddCategories from './addCategories';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';
import NoProduct from "../../../assest/icon/Без названия.png"
import DeleteCategorie from './DeleteStudents';
import EmptyBox from '../../EmptyBox/EmptyBox';
import Loader from "../../Loader/Loader"
const ProductCrud = () => {
    const { data, isLoading, refetch } = useGetCategoryQuery();
    const [search, setSearch] = useState('');
    const filteredData = data ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : [];


    return (
        <div className=" "> {/* Set the height to 100vh */}
            <section className="bg-gray-50  dark:bg-white-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-3xl  px-1 lg:px-12">
                    <div className="bg-white  dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <br />
                        <div className='flex justify-between px-3'>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Izlash..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <AddCategories />
                        </div>
                        <br />
                        <div className=" h-[80vh] ">
                            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">Kategoriya rasm</th>
                                        <th scope="col" className="p-4">Kategoriya Nomi</th>
                                        <th scope="col" className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Loader color="#36d7b7" />
                                            </div> 
                                        ) : filteredData.length > 0 ? (
                                            filteredData.map((item) => {
                                                return (
                                                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" key={item.id}>
                                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center mr-3">
                                                                {item?.thumbnail_image && item?.thumbnail_image !== "" ? (
                                                                    <img
                                                                        src={item?.thumbnail_image}
                                                                        alt="item"
                                                                        className="h-12 w-12 flex-none rounded-full border object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-12 h-12 rounded-full border bg-gray-200 flex justify-center items-center">
                                                                        <img
                                                                            className="h-12 w-12 flex-none rounded-full border object-cover"
                                                                            src={NoProduct}
                                                                            alt="products"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {/* sad */}
                                                            </div> 
                                                        </th>
                                                        <td className="px-4 py-3">
                                                            <span className="bg-primary-100 text-primary-800 text-base font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                                {item?.title}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center space-x-4">
                                                                <ww item={item} />
                                                                <DeleteCategorie  ID= {item.id}/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <EmptyBox />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductCrud;