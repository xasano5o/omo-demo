import React, { useEffect, useState } from "react";
import { RiUserLocationLine } from "react-icons/ri";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { VscLiveShare } from "react-icons/vsc";
const OrderLocation = ({ location }) => {
  console.log(location,'location');
  const [skip, setSkip] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (skip) {
      if (location?.latitude && location?.longitude) {
        setUserLocation([+location.latitude, +location.longitude]);
      } else {
        toast.error("User location not available.");
      }
    }
  }, [skip, location]);

  const defaultState = {
    center: userLocation || [40.7558, 71.6176], // Default to Moscow if user location is not available
    zoom: 5,
  };

  const onClose = () => {
    setSkip(false);
  };

  return (
    <div>

      <button
        onClick={() => setSkip(true)}
        type="button"
        className="inline-flex w-[70px] h-[35px] justify-center items-center rounded-full bg-gray-500 p-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400"
      >
        <RiUserLocationLine size={20} className="text-md" aria-hidden="true" />
      </button>
      <div>

      </div>
      {skip && (
        <Modal closeModal={onClose}>
          <div>
            <b className="flex items-center gap-2">Manzil ulashish:           <a className="flex items-center text-xg text-gray-700 text-decoration-none" href={`https://www.google.com/maps/search/?api=1&query=${+location.latitude},${+location.longitude}`} target="_blank" rel="noopener noreferrer">
              <VscLiveShare />   Share
            </a>
            </b>
            <b className="flex items-center gap-2">Kiritilgan joylashuv:{location?.address}         
            </b>
          </div>

          {userLocation && (
            <YMaps>
              <Map defaultState={defaultState}>
                <Placemark geometry={userLocation} />
              </Map>
            </YMaps>
          )}
        </Modal>
      )}
    </div>
  );
};

export default OrderLocation;
