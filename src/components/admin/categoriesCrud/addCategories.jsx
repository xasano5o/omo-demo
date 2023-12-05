import React, { useState } from 'react';
import { useCreateCategoriaMutation } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';

const AddCategories = () => {
  const [open, setOpen] = useState(false);
  const [createCategoria, { isLoading: isCreating }] = useCreateCategoriaMutation();

  const onClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState({
    name: '',
    img: '',
  });

  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.name);
    formData.append('image', inputValue.img);

    try {
      await createCategoria(formData).unwrap();
      toast.success(`Category ${inputValue.name} added successfully`);
      setInputValue({
        name: '',
        img: '',
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.name}`);
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
  +
         Kategoriya
      </button>
      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
          <div className="flex flex-col gap-3">
            <div>
              <label>Kategoriya Name:</label>
              <input
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
            </div>
            <div>
              <ImageUpload
                title={'Image'}
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

export default AddCategories;
