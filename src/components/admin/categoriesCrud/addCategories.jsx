import React from 'react'
import Modal from '../../generic/Modal'
import { useState } from 'react';
import { useCreateCategorieMutation } from '../../../redux/slice/client/category';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
const AddCategories = () => {
    const [open, setOpen] = useState(false); // Fixed the typo here
    const { createCategorie, isLoading } = useCreateCategorieMutation()
     console.log(isLoading,'isLoading');
    
    const onClose = () => {
        setOpen(false);
    };
    const [inputValue, setInputValue] = useState({
        name: '',
        img:'',
    })

    const addData = async () => {
        const formData = new FormData();
        formData.append('title', inputValue.name);
        formData.append('img', inputValue.img);

        try {
          await createCategorie(formData).unwrap();
          toast.success(`Kategorie ${inputValue.name} qo'shildi`);
          setInputValue({
            name: "",
          })
   
          setOpen(false);
        } catch (error) {
          toast.error(`Kategorie ${inputValue.name} qo'shilmadi`);
        }
      }

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Kategorie Qo'shish
            </button>
            {open && 
           <Modal loader={isLoading} closeModal={onClose} addFunc={addData}>
           <div className='flex flex-col gap-3'>
             <div>
               <label>Kategori nomi</label>
               <input
                 type="text"
                 onChange={(e) =>
                   setInputValue({ ...inputValue, name: e.target.value })
                 }
                 className='block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50'
               />
             </div>
             <div>
               <ImageUpload
                 title={"IMG"}
                 iconName={<MdOutlineInsertPhoto className="text-5xl" />}
                 iconTitle={"Rasmni Yuklash"}
                 fileType={"PNG, JPG, JPEG 5mb gacha"}
                 LabelFor={"img"}
                 setInputValue={setInputValue}
                 inputValue={inputValue}
               />
             </div>
             <button onClick={addData}>Add Category</button> {/* Trigger the addData function here */}
           </div>
         </Modal>}
         
        </div>
    )
}

export default AddCategories