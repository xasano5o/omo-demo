import React, { useState } from 'react';
import AddCategories from './AddCategories';
import NoProduct from "../../../assest/icon/Без названия.png"
import DeleteCategorie from './DeleteStudents';
import Loader from '../../Loader/Loader';
import EmptyBox from "../../EmptyBox/EmptyBox.jsx"
import { useGetProductCatgoriQuery } from '../../../redux/slice/client/getProduct/index.js';
import ViewProduct from './ViewParent.jsx';
import UpdateProduct from './Update.jsx';
import AddImgUpload from './ImgUpload.jsx';
import { useGetDiscountQuery } from '../../../redux/slice/client/discount/index.js';

const DiscountTbale = () => {
    const { data, error, isLoading } = useGetDiscountQuery();

    const [search, setSearch] = useState('');
    const filteredData = data ? data?.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) : [];
    const [isHovered, setIsHovered] = useState(false);
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
                                className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-white dark:bg-white focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Izlash..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <AddCategories />
                        </div>
                        <br />
                        <div className="overflow-x-auto  h-[80vh] ">
                            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">Chegirma nomi</th>
                                        <th scope="col" className="p-4">Chegirma turi </th>
                                        <th scope="col" className="p-4">Boshlanish vaqti</th>
                                        <th scope="col" className="p-4">Maxsulot Yaratilgan Vaqti</th>
                                        <th scope="col" className="p-4"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Loader color="#36d7b7" />
                                            </div>
                                        ) : filteredData?.length > 0 ? (
                                            filteredData?.map((item) => {

                                                const dateObject = new Date(item.start_date);
                                                const dateObject1 = new Date(item.end_date);

                                                const options = { hour12: false };
                                                const formattedDate = dateObject.toLocaleString('en-US', options);
                                                const formattedDate2 = dateObject1.toLocaleString('en-US', options);

                                                

                                                return (
                                                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100  dark:hover:bg-white-700" key={item.id}>
                                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <span className="text-gray-800  text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.title}
                                                            </span>
                                                        </th>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-800  text-base font-medium px-2 py-0.5 rounded">
                                                                {item?.products_status=== 'ALL' ? 'Barcha maxsulot chegirma'  :'Bazi bir maxsulotga'}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                                                            >
                                                                {formattedDate}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`text-gray-800  text-base font-medium px-2 py-0.5 rounded`}
                                                            >
                                                                {formattedDate2}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center space-x-4">
                                                                {/* <ViewProduct object={item} /> */}
                                                                {/* <AddImgUpload ID={item.id} /> */}
                                                                <UpdateProduct object={item} />
                                                                <DeleteCategorie ID={item.id} />
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

export default DiscountTbale;
