import React, { useState } from 'react';
import Modal from '../../generic/Modal';
import { toast } from 'react-toastify';
import { BiEdit } from 'react-icons/bi';
import { useUpdateDeliveriesMutation } from '../../../redux/slice/client/deliveries';

const UpdateDeliveries = ({ item }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const [updateCategorie, { isLoading }] = useUpdateDeliveriesMutation()
  const [inputValue, setInputValue] = useState(item);

  const addData = async () => {
    const formData = new FormData();
    formData.append('name', inputValue.name);
    formData.append('price', inputValue.price);
    try {
      await updateCategorie({ id: item.id, form_data: formData }).unwrap();
      toast.success(`Manzil ${inputValue.name} o'zgartirildi`);
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.name}`);
    }
  };
 console.log(inputValue.name);
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
            <div>
              <label className='text-gray-900'>Manzil Narxi:</label>
              <input
                value={inputValue?.name}
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className='text-gray-900'>Manzil narhi:</label>
              <input
                value={inputValue?.price}
                type="input"
                onChange={(e) => setInputValue({ ...inputValue, price: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpdateDeliveries;
