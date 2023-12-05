import React, { useState } from 'react';
import { useCreateCategoriaMutation, useGetCategoryQuery } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AiOutlineUserAdd } from "react-icons/ai";

const AddCategories = () => {
  const [open, setOpen] = useState(false);
  const [createCategoria, { isLoading: isCreating }] = useCreateCategoriaMutation();
  const { data, isLoading, refetch } = useGetCategoryQuery();


  const onClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    agreeTerms: false,
  });



  const addData = async () => {
    // const formData = new FormData();
    // formData.append('title', inputValue.name);
    // formData.append('image', inputValue.img);

    // try {
    //   await createCategoria(formData).unwrap();
    //   toast.success(`Category ${inputValue.name} added successfully`);
    //   setInputValue({
    //     name: '',
    //     img: '',
    //   });
    //   setOpen(false);
    // } catch (error) {
    //   toast.error(`Failed to add category ${inputValue.name}`);
    //   console.error('Error creating category:', error);
    // }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        +
        Maxsulot
      </button>
      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
          <div className='grid grid-cols-2 gap-3 '>
            <div className='flex flex-col gap-2'>
              <div>
                <label htmlFor="Maxsulot Nomi:">Maxsulot Nomi:</label>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-60 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Maxsulot Name:">Maxsulot Narxi:</label>
                <input
                  type="number"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-60 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Maxsulot Name:">Maxsulot Miqdori:</label>
                <input
                  type="number"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-60 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Maxsulot Name:">Maxsulot o'lchov:</label>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg w-60 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Mahsulox haqida....</label>
                <textarea
                  id="message"
                  rows="4"
                  // value={message}
                  // onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                ></textarea>
              </div>

            </div>
            <div className='flex flex-col '>
              <div className='flex flex-col'>
                <label htmlFor="">Kategorie Tanlang</label>
                <select 
                 className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="Hech Biri">Hech Biri</option>
                  {data.map((value) => {
                    return (
                      <option value={value.title}>{value.title}</option>
                    )
                  })}
                </select>

                <div className='flex flex-col '>
                <label htmlFor="">Kategorie Sub Tanlang</label>
                <select  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="Hech Biri">Hech Biri</option>
                  {data.map((value) => {
                    return (
                      <option value={value.title}>{value.title}</option>
                    )
                  })}
                </select>
              </div>
              </div>
            </div>
          </div>

        </Modal>
      )}
    </div>
  );
};

export default AddCategories;
