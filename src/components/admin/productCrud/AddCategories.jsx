import React, { useState } from 'react';
import { useCreateCategoriaMutation } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { AiOutlineUserAdd } from "react-icons/ai";

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

  cdscsd


          

        </Modal>
      )}
    </div>
  );
};

export default AddCategories;
