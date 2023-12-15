import React, { useEffect, useState } from 'react';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useCreateSubCategoriaMutation } from '../../redux/slice/client/subcategory';
import { useGetCategoryQuery } from '../../redux/slice/client/category';
import Modal from '../generic/Modal';
import ImageUpload from '../ImageUpload/ImageUpload';
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
    subcategory: ""
  });
  console.log(inputValue,'inputValue');

  const addData = async () => {
    const formData = new FormData();
    formData.append('title', inputValue.name);
    formData.append('image', inputValue.img);
    formData.append('category', inputValue.subcategory);

    try {
      await createSubCategoria(formData).unwrap();
      toast.success(`Category ${inputValue.name} added successfully`);
      setInputValue({
        name: '',
        img: '',
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to add category ${inputValue.name}`);
      console.error('Error creating category:', error);
    }
  };
  const defaultState = {
    center: inputValue.location,
    zoom: 13,
  };

  const [userLocation, setUserLocation] = useState([55.684758, 37.738521]);

  const handleBoundsChange = (e) => {
    const newCenter = e.get('newCenter');
    setUserLocation(newCenter);
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
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>

      {open && (
        <Modal loader={isCreating} closeModal={onClose} addFunc={addData}>
          <div className=" w-[700px] flex flex-col gap-3">
            <div className='flex flex-col  w-full'>
              <label>Familiya *</label>
              <input
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />

              <label>Ism *</label>
              <input
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />

              <label>Telefon raqami *</label>
              <input
                type="text"
                onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                className="block w-full px-2 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              />
            </div>

            <YMaps query={{ lang: 'en_RU' }}>
              <Map
                width={'100%'}
                height={'400px'}
                defaultState={defaultState}
                onClick={(e) => {
                  const coordinates = e.get('coords');
                  // Handle the selected coordinates (e.g., store them in state or send to the server)
                  console.log('Selected coordinates:', coordinates);
                }}
              >
                <Placemark geometry={[55.684758, 37.738521]} options={{ draggable: true }} />
              </Map>
            </YMaps>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BasketCheckout;
