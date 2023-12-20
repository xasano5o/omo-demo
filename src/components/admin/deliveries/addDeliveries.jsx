import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../generic/Modal';
import { useCreateDeliveriesMutation } from '../../../redux/slice/client/deliveries';

const AddDelivveries = () => {

  const [open, setOpen] = useState(false);
  const [createCategoria, { isLoading: isCreating }] = useCreateDeliveriesMutation();

  const onClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState({
    name: '',
    price: '',
  });

  const addData = async () => {
    const formData = new FormData();
    formData.append('name', inputValue.name);
    formData.append('price', inputValue.price);

    try {
      await createCategoria(formData).unwrap();
      toast.success(`Manzil ${inputValue.name} Qo'shildi `);
      setInputValue({
        name: '',
        price: '',
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Manzil${inputValue.name} Qo'shilmadi`);
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
        +Manzil
      </button>
      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
          <div className="flex flex-col gap-3">
            <div>
              <label> Manzil Nomi:</label>
              <input
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
              <label> Manzil Narxi:</label>
              <input
                type="NUMBER"
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

export default AddDelivveries;
