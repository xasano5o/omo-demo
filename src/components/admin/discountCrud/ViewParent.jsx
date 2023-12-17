import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Modal from "../../generic/Modal";

export default function View({ object }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(!open);


  const formatDate = (dateString) => {
    const options = {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };  
    const dateObject = new Date(dateString);
    return dateObject.toLocaleString('en-US', options);
  };

  // Ushbu qismda object.start_date ni formatlangan holda chiqaramiz
  const formattedStartDate = object.start_date ? formatDate(object.start_date) : '';
  const formattedStartDate2 = object.end_date ? formatDate(object.end_date) : '';


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
                  {
                    object?.products.length > 0 ?
                      object?.products?.map((value) => {
                        return (
                          <div className="object-contain ">
                            <img className="shadow border border-black p-1 " src={value.image || 'defaultImagePath.jpg'} alt="" />
                          </div>
                        )
                      }) : <p className="text-gray-800 ">Maxsulot Rasmlari yuq</p>
                  }
                </div>
              </div>
              <div className="d:w-2/3 sm:w-full sx:w-full p-2 h-full">
                <div className="bg-white rounded-lg shadow-lg border p-4 text-gray-800   ">
                  <h2 className="text-xl mb-2">Barcha malumotlar</h2>
                  <p>
                    <strong >Chegirmani nomi:</strong>  {object.title}
                  </p>
                  <p>
                    <strong>Chegirma boshlanish vaqti: &nbsp; </strong> {formattedStartDate || 'malumot kiritilmagan'}
                  </p>
                  <p>
                    <strong>Chegirma tugash vaqti:</strong>&nbsp; {formattedStartDate2}
                  </p>
                  <p>
                    <strong>Chegirma Turi:</strong> {object.products_status === 'ALL' ? 'Barcha maxsulot chegirma' : 'Bazi bir maxsulotga'}
                  </p>
                  <p>
                    <strong>Chegirma Foizi: &nbsp; </strong> {object.value || 'malumot kiritilmagan'}
                    % </p>
                  <p>
                    <strong>kategoriya:</strong> {object?.category?.map((value) => {
                      return (
                        <span>  {value.title || 'yuq'} / </span>
                      )
                    })}
                  </p>
                  <p>
                    <strong>ichki kategoriya:</strong> {
                      object.subcategory.length > 0 ?
                        object?.subcategory?.map((value) => {
                          return (
                            <span>  {value.title || `yo'q`} / </span>
                          )
                        }) : `yo'q`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}