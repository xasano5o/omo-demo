import React, { useState } from 'react';
import { useGetCategoryQuery } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '../../../redux/slice/client/getProduct';
import { useGetSubCategoryQuery } from '../../../redux/slice/client/subcategory';

const AddProduct = ({ object }) => {
  // state
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);

  // redux
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data, isLoading, refetch } = useGetCategoryQuery();
  const { data: subData } = useGetSubCategoryQuery()



  // fuction
  const onClose = () => {
    setOpen(false);
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
          {/* <div>

<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
</label>
        </div> */}

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
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Mahsulot tanlash</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option value="ALL">Hammasi</option>
                  <option value="CUSTOM">Tanlanganlar</option>
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
