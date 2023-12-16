import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateSubCategoriaMutation } from '../../redux/slice/client/subcategory';
import { useGetCategoryQuery } from '../../redux/slice/client/category';
import Modal from '../generic/Modal';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

const BasketCheckout = () => {
  const [open, setOpen] = useState(false);
  const [createSubCategoria, { isLoading: isCreating }] = useCreateSubCategoriaMutation();
  const { data } = useGetCategoryQuery();

  const onClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState({
    name: '',
    img: '',
    subcategory: '',
    location: [55.684758, 37.738521], // Default location
  });


  console.log(inputValue.location, 'inputValue');
  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.name);
    formData.append('image', inputValue.img);
    formData.append('category', inputValue.subcategory);
    // Add the latitude and longitude to formData
    formData.append('latitude', inputValue.location[0]);
    formData.append('longitude', inputValue.location[1]);

    try {
      await createSubCategoria(formData).unwrap();
      toast.success(`Category ${inputValue.name} added successfully`);
      setInputValue({
        name: '',
        img: '',
        subcategory: '',
        location: [55.684758, 37.738521], // Reset location to default after submission
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.name}`);
      console.error('Error creating category:', error);
    }
  };

  const defaultState = {
    center: inputValue.location,
    zoom: 15,
  };

  const [markerGeometry, setMarkerGeometry] = useState(defaultState.center);

  const handleMapClick = (e) => {
    const coordinates = e.get('coords');
    // Update the marker coordinates when the map is clicked
    setMarkerGeometry(coordinates);
    // Update the inputValue state with the selected coordinates
    setInputValue({
      ...inputValue,
      location: coordinates,
    });
  };

  useEffect(() => {
    // Fetch user's current location using the browser's geolocation service
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
          console.error('Error fetching user location:', error);
          toast.error('Failed to fetch user location. Defaulting to the default location.');
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
      toast.warning('Geolocation is not supported by this browser. Defaulting to the default location.');
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        Check out
      </button>

      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
          <div className="w-full md:w-[400px] flex flex-col gap-3 p-4">

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div>
                <label>Familiya *</label>
                <input
                  type="text"
                  value={inputValue.name}
                  onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                  className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label>Ism *</label>
                <input
                  type="text"
                  value={inputValue.name}
                  onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                  className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                />
              </div>
            </div>

            <YMaps query={{ lang: 'en_RU' }}>
              <Map
                width={'100%'}
                height={'400px'}
                defaultState={defaultState}
                onClick={handleMapClick}
              >
                <Placemark geometry={markerGeometry} options={{ draggable: true }} />
              </Map>
            </YMaps>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BasketCheckout;
