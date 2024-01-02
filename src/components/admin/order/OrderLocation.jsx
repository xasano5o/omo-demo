import React, { useEffect, useState } from "react";
import { RiUserLocationLine } from "react-icons/ri";
import Modal from "../../generic/Modal";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

const OrderLocation = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultState = {
    center: [+location?.longitude, +location.latitude],
    zoom: 15,
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="inline-flex w-[70px] h-[35px] justify-center items-center rounded-full bg-gray-500 p-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400"
        aria-label="Open Location Map"
      >
        <RiUserLocationLine size={20} className="text-md" aria-hidden="true" />
      </button>
      {isModalOpen && (
        <Modal closeModal={onClose}>


          <div>
            <a
              href={`https://www.google.com/maps/search/${location.longitude},${location.latitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share
            </a>

          </div>
          <YMaps>
            <Map defaultState={defaultState}>
              <Placemark geometry={[+location?.longitude, +location.latitude]} />
            </Map>
          </YMaps>
        </Modal>
      )}
    </div>
  );
};

export default OrderLocation;
