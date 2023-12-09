import React, { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useGetProductQuery } from '../../../redux/slice/client/getProduct';
import { useGetSubCategoryQuery } from '../../../redux/slice/client/subcategory';

const AddProduct = ({ object }) => {
  // state
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);

  // redux
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data, isLoading, refetch } = useGetCategoryQuery();
  const { data: subData } = useGetSubCategoryQuery()
  const { data: productData } = useGetProductQuery()



  // fuction
  const onClose = () => {
    setOpen(false);
  };

  const [direction, setDirection] = useState('ALL');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (direction === 'ALL') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [direction]);

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  // post data
  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('image', inputValue.img);
    formData.append('description', inputValue.description);
    formData.append('price', inputValue.price);
    formData.append('amount', inputValue.amount);
    formData.append('amount_measure', inputValue.amount_measure);
    formData.append('category', inputValue?.category);
    if (inputValue.subcategory) {
      formData.append('subcategory', inputValue?.subcategory);
    }

    try {
      await createProduct(formData).unwrap();
      toast.success(`Category ${inputValue.title} added successfully`);
      setInputValue({
        title: '',
        img: '',
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.title}`);
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
        Maxsulot
      </button>
      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>

          <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 ">Nomi</label>

                <input type="text" id="Name"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Chegirma nomi" required />
              </div>

              <div>
                <label for="chegirmamiqdori" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Chegirma miqdori</label>
                <input type="text" id="chegirmamiqdori" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chegirma miqdori(%)" required />
              </div>
              <div>
                <label for="boshsana" class="block mb-2 text-sm font-medium text-gray-900 ">Boshlanish sana</label>
                <input type="datetime-local" id="boshsana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
              </div>
              <div>
                <label for="tugashsana" class="block mb-2 text-sm font-medium text-gray-900 ">Tugash sana</label>
                <input type="datetime-local" id="tugashsana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
              </div>
              <div>
                <label htmlFor="direction" className="block mb-2 text-sm font-medium text-gray-900">Mahsulot Yunalishi</label>
                <select id="direction" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleDirectionChange}>
                  <option value="ALL">Hech biri</option>
                  <option value="ALL">Hammasi</option>
                  <option value="CUSTOM">Tanlanganlar</option>
                </select>
              </div>
              <div>
                <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900">Ichki kategoriya tanlang</label>
                <select id="subCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  {
                    subData?.map((value) => {
                      return (
                        <option value={value.title} disabled={direction === 'ALL'}>{value.title}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Kategoriya tanlang</label>
                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  {
                    data?.map((value) => {
                      return (
                        <option value={value.title} disabled={direction === 'ALL'}>{value.title}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div>
                <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900">Mahsulot tanlash</label>
                <select id="product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  {
                    productData?.map((value) => {
                      return (
                        <option value={value.title} disabled={direction === 'ALL'}>{value.title}</option>
                      )
                    })
                  }
                </select>
              </div>


            </div>
          </form>


        </Modal>
      )}
    </div>
  );
};

export default AddProduct;
