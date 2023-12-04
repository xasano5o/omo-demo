import React from 'react';
import AddCategories from './addCategories';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';


const ProductCrud = () => {

    const { data, isLoading, refetch } = useGetCategoryQuery();
    console.log(data,'data');
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
                           <AddCategories/>
                        </div>
                        <br />
                        <div className="overflow-x-auto  h-[85vh] ">
                            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">C</th>
                                        <th scope="col" className="p-4">Category</th>
                                        <th scope="col" className="p-4">Stock</th>
                                        <th scope="col" className="p-4">Sales/Day</th>
                                        <th scope="col" className="p-4">Sales/Month</th>
                                        <th scope="col" className="p-4">Rating</th>
                                        <th scope="col" className="p-4">Sales</th>
                                        <th scope="col" className="p-4">Revenue</th>
                                        <th scope="col" className="p-4">Last Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center mr-3">
                                                <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="iMac Front Image" className="h-8 w-auto mr-3" />
                                                Apple iMac 27"
                                            </div>
                                        </th>
                                        <td className="px-4 py-3">
                                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Desktop PC</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <div className="h-4 w-4 rounded-full inline-block mr-2 bg-red-700"></div>
                                                95
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1.47</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.47</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {/* ... more SVG icons */}
                                                <span className="text-gray-500 dark:text-gray-400 ml-1">5.0</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 mr-2" aria-hidden="true">
                                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                                1.6M
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">$3.2M</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center space-x-4">
                                                <button type="button" data-drawer-target="drawer-update-product" data-drawer-show="drawer-update-product" aria-controls="drawer-update-product" className="py-2 px-3 flex items-center text-sm font-medium text-center  bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                    {/* ... Edit button */}
                                                </button>
                                                <button type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                    {/* ... Preview button */}
                                                </button>
                                                <button type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                                    {/* ... Delete button */}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* ... Additional rows */}
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
