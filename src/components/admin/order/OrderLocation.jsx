import React, { useEffect, useState } from "react";
import { RiUserLocationLine } from "react-icons/ri";
import { useGetOrderQuery } from "../../../redux/slice/client/order";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

const OrderLocation = ({ location }) => {
  const [skip, setSkip] = useState(false);
  const [inputValue, setInputValue] = useState({
    location
  });
  const defaultState = {
    center: inputValue.location,
    zoom: 15,
  };
  const [markerGeometry, setMarkerGeometry] = useState(defaultState.center);

  const handleMapClick = (e) => {
    const coordinates = e.get("coords");
    setMarkerGeometry(coordinates);
    setInputValue({
      ...inputValue,
      location: coordinates,
    });
  };

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInputValue({
            ...inputValue,
            location: [latitude, longitude],
          });
        },
        (error) => {
          toast.error(
            "Failed to fetch user location. Defaulting to the default location."
          );
        }
      );
    } else {
      toast.warning(
        "Geolocation is not supported by this browser. Defaulting to the default location."
      );
    }
  }, []); 

  const { data, isLoading, refetch } = useGetOrderQuery({ skip });

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
      {skip && (
        <Modal closeModal={onClose}>
          <YMaps query={{ lang: "en_RU" }}>
            <Map
              width={"100%"}
              height={"300px"}
              defaultState={defaultState}
              onClick={handleMapClick}
            >
              <Placemark
                geometry={markerGeometry}
                options={{ draggable: true }}
              />
            </Map>
          </YMaps>
        </Modal>
      )}
    </div>
  );
};

export default OrderLocation;
