import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { AiOutlineEye } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

export default function View({ object }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(!open);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Ko'rish
      </button>
      {open && (
        <Modal closeModal={onClose} actionType="view">
          <div className="w-[80vw] p-4">
            <div className="flex w-full h-full md:items-stretch md:flex-row sm:flex-col sm:items-center sx:flex-col">
            <div className="md:w-1/3 sm:w-full sx:w-full p-2 h-full">
                <div className="grid grid-cols-2 h-[32vh] overflow-y-auto bg-white rounded-lg gap-2 shadow-lg border p-4">
                {object?.images.image && object.images.image !== "" ? (
                    <img
                      src={object.images.image}
                      alt="avatar"
                      classNameName="mx-auto rounded-full w-40 h-40 object-cover"
                    />
                  ) : (
                    <div classNameName="w-40 h-40 rounded-full border bg-gray-200 flex justify-center items-center">
                      <FaUserTie classNameName="text-7xl text-primary" />
                    </div>
                  )}

                </div>
              </div>
              <div className="d:w-2/3 sm:w-full sx:w-full p-2 h-full">
                <div className="bg-white rounded-lg shadow-lg border p-4 text-gray-800   ">
                  <h2 className="text-xl mb-2">Barcha malumotlar</h2>
                  <p>
                    <strong >Maxsulot nomi:</strong> {object.title}
                  </p>
                  <p>
                    <strong>Kategoriyasi:</strong> {object?.category.title}
                  </p>
                  <p>
                    <strong>Narxi:</strong> {object.price}
                  </p>
                  <p>
                    <strong>Qo'shilgan Vaqti:</strong> {object.created_date}
                  </p>
                  <p>
                    <strong>Miqdori:</strong> {object.amount}
                  </p>
                  <p>
                    <strong>O'lchovi:</strong> {object.amount_measure || 'Hali belgilanmadi'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-black">description</h1>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
