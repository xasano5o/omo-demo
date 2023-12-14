import React, { useState } from 'react';
import { useGetSubCategoryQuery } from '../../../redux/slice/client/subcategory';
import EmptyBox from '../../EmptyBox/EmptyBox';
import Loader from '../../Loader/Loader';
import DeleteSubCategorie from './DeleteSubStudents';
import UpdateSubCategories from './UpdateSubCategorie';
import AddSubCategories from './AddSubCategories';
import NoProduct from "../../../assest/icon/Без названия.png"
import { useGetCategoryQuery } from '../../../redux/slice/client/category';

const SubcategorieCom = () => {

    const { data: catergorsubtable } = useGetCategoryQuery();
    const { data, isLoading, refetch } = useGetSubCategoryQuery();
    const [search, setSearch] = useState('');
    const filteredData = data ? data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : [];

    return (
        <div className=" ">
            <section className="bg-gray-50  dark:bg-white-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl  px-4 lg:px-12">
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
                            <AddSubCategories />
                        </div>
                        <br />
                        <div className="overflow-x-auto  h-[80vh] ">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">SubKategoriya rasmi</th>
                                        <th scope="col" className="p-4">SubKategoriya Nomi</th>
                                        <th scope="col" className="p-4">Katta Kategory Nomi</th>
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
                                                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-white-700" key={item.id}>
                                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center mr-3">
                                                                {item?.image && item?.image !== "" ? (
                                                                    <img
                                                                        src={item?.image}
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
                                                            </div>
                                                        </th>
                                                        <td className="px-4 py-3">
                                                            <span className="bg-primary-100 text-primary-800 text-base font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                                {item?.title}
                                                            </span>
                                                        </td>
                                                  
                                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center space-x-4">
                                                                <UpdateSubCategories item={item} />
                                                                <DeleteSubCategorie ID={item.id} />
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

export default SubcategorieCom;