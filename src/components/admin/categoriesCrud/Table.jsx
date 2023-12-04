import React from 'react';
import AddCategories from './addCategories';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';
import { LiaEdit } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";

const ProductCrud = () => {

    const { data, isLoading, refetch } = useGetCategoryQuery();
    console.log(data, 'data');
    return (
        <div className=" "> {/* Set the height to 100vh */}
            <section className="bg-gray-50  dark:bg-white-900 p-3 sm:p-5 antialiased">

                <div className="mx-auto max-w-screen-2xl  px-4 lg:px-12">
                    <div className="bg-white  dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <br />
                        <div className='flex justify-between px-3'>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Izlash..."
                            // value={searchTerm}
                            // onChange={handleSearchChange}
                            />
                            <AddCategories />
                        </div>
                        <br />
                        <div className="overflow-x-auto  h-[80vh] ">
                            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">Kategoriya rasm</th>
                                        <th scope="col" className="p-4">Kategoriya Nomi</th>
                                        <th scope="col" className="p-4"></th>
            

                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item) => {
                                        return (
                                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex items-center mr-3">
                                                        <img src={item?.image|| "nhjjhk" }  alt="iMac Front Image" className="h-8 w-auto mr-3" />

                                                    </div>
                                                </th>
                                                <td className="px-4 py-3">
                                                    <span className="bg-primary-100 text-primary-800 text-base font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{item?.title}</span>
                                                </td>
                                               
                                               
                                                
                                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex items-center space-x-4">
                                                        <button type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium outline-none text-center bg-primary-700 rounded-lg  dark:bg-primary-600 dark:hover:bg-primary-700">
                                                        <LiaEdit className='text-3xl' />
                                                        </button>
                                                        <button type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium outline-none text-center bg-primary-700 rounded-lg  dark:bg-primary-600 dark:hover:bg-primary-700">
                                                        <BsEye className='text-3xl'/>
                                                        </button>
                                                 
                                                        <button type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-70 text-white border  bg-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                        <AiOutlineDelete className='text-2xl' /> 
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
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
