import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import Modal from "../../generic/Modal.jsx";
import { useDeleteDeliveriesMutation } from "../../../redux/slice/client/deliveries/index.js";

export default function DeleteDliveries({id}) {
    const [skip, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(!skip);
    const [deleteProduct, { isLoading }] = useDeleteDeliveriesMutation({skip});

    const handleDelete = async (id) => {
        try {
            await deleteProduct({ id:id });
            toast.success("Maxsulot o'chirildi!");
            setIsOpen(false);
        } catch (err) {
            toast.error("Maxsulot o'chirishda xatolik:", err);
        }};

    return (
        <div>
            <button
                onClick={() => setIsOpen(!skip)}
                type="button"
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <BsTrash className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                O'chirish
            </button>
            {skip && (
                <Modal
                    addFunc={() => handleDelete(id)}
                    closeModal={closeModal}
                    loader={isLoading}
                    actionType={"delete"}
                >
                    <div className="py-5 px-10">
                        <h1 className="text-2xl font-bold text-red-600">
                            Malumotni o'chirishga rozimisiz !!!
                        </h1>
                    </div>
                </Modal>
            )}
        </div>
    );
}
