import React, { useState } from 'react';
import { useCreateCategoriaMutation, useGetCategoryQuery } from '../../../redux/slice/client/category';
import Modal from '../../generic/Modal';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { MdOutlineAddAPhoto, MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useGetProductIdImgQuery } from '../../../redux/slice/client/getProduct';

const AddImgUpload = () => {
    const [open, setOpen] = useState(false);
    const [createSubCategoria, { isLoading: isCreating }] = useGetProductIdImgQuery();

    const onClose = () => {
        setOpen(false);
    };

    const [inputValue, setInputValue] = useState({
        id: '',
        img: '',
    });

    const addData = async () => {
        const formData = new FormData();
        formData.append('id', inputValue.id);
        formData.append('product', inputValue.product);

        try {
            await createSubCategoria(formData).unwrap();
            toast.success(` Maxsulot${inputValue.name} rasmi qushildi`);
            setInputValue({
                id: '',
                product: '',
            });
            setOpen(false);
        } catch (error) {
            toast.error(`Maxsulot ${inputValue.name} rasm qushilmadi`);
        }
    };

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex w-[70px] h-[35px] justify-center items-center rounded-full bg-blue-500 p-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
            >
                <MdOutlineAddAPhoto />
 
            
            </button>
            {open && (
                <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
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
                </Modal>
            )}
        </div>
    );
};

export default AddImgUpload;
