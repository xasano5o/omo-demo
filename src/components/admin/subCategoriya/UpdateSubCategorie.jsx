import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useUpdateSubCategorieMutation } from '../../../redux/slice/client/subcategory';
import ImageUpload from '../../ImageUpload/ImageUpload';
import Modal from '../../generic/Modal';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';

const UpdateSubCategories = ({ item }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const { data,  refetch } = useGetCategoryQuery();
  const [updateSubCategorie, { isLoading }] = useUpdateSubCategorieMutation()
  const [inputValue, setInputValue] = useState(item);

  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('image', inputValue.img);
    formData.append('id', inputValue.id);
    try {
      await updateSubCategorie(formData).unwrap();
      toast.success(`Category ${inputValue.title} o'zgartirildi`);
      setInputValue({
        title: '',
        img: '',
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.title}`);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex w-[70px] h-[35px] justify-center items-center rounded-full bg-blue-500 p-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
      >
        <BiEdit size={20} className="text-md" aria-hidden="true" />
      </button>
      {open && (
        <Modal loader={isLoading} closeModal={onClose} addFunc={addData}>
          <div className="flex flex-col gap-3">
          <div className='flex flex-col '>
                <label htmlFor="">Kategorie Tanlang</label>
                <select  onChange={(e) => setInputValue({...inputValue,subcategory:e.target.value})}   className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {data.map((value) => {
                    return (
                      <option value={value.id}>{value?.title}</option>
                    )
                  })}
                </select>
              </div>
            <div>
              <label className='text-gray-900'>Ichki Category Name:</label>
              <input
                value={inputValue?.title}
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
            </div>
            <div>
              <ImageUpload
                title={'image'}
                iconName={<MdOutlineInsertPhoto className="text-5xl" />}
                iconTitle={'Upload Image'}
                fileType={'PNG, JPG, JPEG up to 5MB'}
                LabelFor={'img'}
                setInputValue={setInputValue}
                inputValue={inputValue}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpdateSubCategories;
