import React, { useEffect, useState } from "react";
import { ImFire } from "react-icons/im";
import {
  useDeleteBasketMutation,
  useGetBasketQuery,
  useGetSelectAllQuery,
  useGetSelectUserIdQuery,
  useGetSelectUserQuery,
  useIncrementMutation,
} from "../../redux/slice/client/basket";
import BasketCheckout from "./BasktChecout";

const Basket = () => {
  const { data: dataBasket, isSuccess, refetch: refetchData } = useGetBasketQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [skip,setSkip] =useState(false)
  const [user, setUser] = useState()
  const [selectTotal, setSelectTotal] = useState(1);
  const [totalAmount, settotalAmount] = useState(0);
  const { data, refetch } = useGetSelectAllQuery({ isAllSelected })
  const { data: dataUser, refetch: refetchUser } = useGetSelectUserIdQuery({
    skip,
    userId: user?.id, // Include user ID as a query parameter
  });


  const deleteFunc = async (id) => {
    try {
      await deleteBasket({ id });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  useEffect(() => {
    if (isAllSelected) {
      refetch()
      setTimeout(() => {
        refetchData()
      }, 500)
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (user) {
      refetchUser()
      setTimeout(() => {
        refetchData()
      }, 500)
    }
  }, [user]);
  const handleSelectAmount = async (e, value) => {
    const newAmount = e?.target?.value;
    setSelectTotal(newAmount);

    const formData = new FormData();
    formData.append("amount", newAmount);
    formData.append("id", value.id);
    try {
      await Increment(formData).unwrap();
    } catch (error) {
    }
  };

  const increment = async (value) => {
    const formData = new FormData();
    formData.append("amount", value?.amount + 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };

  const decrement = async (value) => {
    const formData = new FormData();
    formData.append("amount", value.amount - 1);
    formData.append("id", value.id);

    try {
      await Increment(formData).unwrap();
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(dataBasket?.items)) {
        const total = dataBasket?.items?.reduce(
          (a, b) => a + (b?.total_price?.discount_price || 0) * b.amount,
          0
        );
        settotalAmount(total);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [dataBasket]);




  const selectAll = () => {
    const allUserIds = dataBasket?.items?.map((user) => user?.id);
    setIsAllSelected(!isAllSelected);
    setSelectedUsers(isAllSelected ? [] : allUserIds);
  };

  useEffect(() => {
    selectAll();
  }, [isSuccess]);

  const handleUserSelect = (user) => {
    setUser(user?.id)
    setSkip(true)
    
    if (selectedUsers?.includes(user?.id)) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id]);
    }

    // Update isAllSelected based on whether all users are selected
    setIsAllSelected(selectedUsers.length === dataBasket?.items?.length);
  };
  const isUserSelected = (user) => {
    return selectedUsers?.includes(user.id);
  };
  const isAllUsersSelected = () => {
    return selectedUsers.length === dataBasket?.items?.length;
  };
console.log(dataBasket?.total_price?.discount_price,'dataBasket?.total_price?.discount_price}');
  return (
    <div className="bg-gray-100 pt-12 h-screen">
      <div className="container mx-auto">
        <h1 className="text-xl">
          Savatga olingan maxsulotlar soni: {dataBasket?.items?.length}
        </h1>
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <input
            id="selectAll"
            name="selectAll"
            type="checkbox"
            checked={isAllSelected}
            onChange={selectAll}
          />
          <label htmlFor="selectAll">Hammasini tanlash</label>
        </div>
        <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 p-4 flex flex-col gap-2 h-[70vh] overflow-x-auto">
            {dataBasket?.items?.map((value) => (
              <div
                key={value?.id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <div key={value?.id} className="flex items-center">
                  <input
                    className=""
                    type="checkbox"
                    checked={isUserSelected(value)}
                    onChange={() => handleUserSelect(value)}
                  />
                </div>
                <div className="flex justify-end mb-2 xl:mb-0 lg:mb-0 md:mb-0 -mt-3 md:-mt-0 xl:-mt-0 lg:-mt-0 sm:block md:hidden sm:items-center lg:hidden xl:hidden">
                  <svg
                    onClick={() => deleteFunc(value?.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <img
                  src={value?.product?.image}
                  alt="product-image"
                  className="w-full rounded-lg md:ml-7 lg:ml-7 xl:ml-7 sm:w-40 object-contain"
                />
                <div className="sm:ml-4 sm:flex md:flex-nowrap sm:w-full sm:justify-between p-3">
                  <div className="mt-5 sm:mt-0 ">
                    <h2 className="text-lg font-bold text-gray-900">
                      {value?.product?.title}
                    </h2>
                    <p className="mt-1 text-base text-gray-700">
                      {value.product?.description?.length > 100
                        ? `${value?.product?.description.substring(0, 70)}...`
                        : value?.product?.description}
                    </p>
                  </div>
                  {value?.product?.discount?.value ? (
                    <div className="flex justify-center">
                      <ImFire />
                      <p className="text-base text-gray-700">{value.product.discount.value}%</p>
                    </div>
                  ) : null}

                  <div className="flex justify-between flex-wrap md:flex-nowrap lg:flex-nowrap xl:flex-nowrap im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="hidden lg:block xl:block md:block">
                      <div className="flex justify-end">
                        <svg
                          onClick={() => deleteFunc(value?.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => decrement(value)}
                          className="cursor-pointer rounded-l bg-blue-500  text-white py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="text"
                          value={value?.amount}
                          min="1"
                        />
                        <span
                          onClick={() => increment(value)}
                          className="cursor-pointer rounded-r bg-blue-500  text-white py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <select onChange={(e) => handleSelectAmount(e, value)}>
                        <option value="1">1</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                    <div className="flex items-center flex-col justify-between">
                      {value?.product?.discount?.product_discount_price?.toLocaleString ? (
                        <p className="text-sm">
                          {value?.product?.discount?.product_discount_price?.toLocaleString(
                            "uz-UZ"
                          )}
                          so'm
                        </p>
                      ) : null}
                      {value?.total_price?.discount_price?.toLocaleString ? (
                        <p className="text-sm">
                          {value?.total_price?.discount_price?.toLocaleString(
                            "uz-UZ"
                          )}
                          so'm
                        </p>
                      ) : null}
                      {value?.total_price?.discount_price && value?.product?.discount?.product_discount_price ? (
                        <del>
                          {value?.product?.price?.toLocaleString("uz-UZ")} so'm
                        </del>
                      ) : <p>
                        {value?.product?.price?.toLocaleString("uz-UZ")} so'm
                      </p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* mobile */}
            <div className="mt-6 h-fit rounded-lg border md:hidden xl:hidden lg:hidden bg-white p-6 shadow-md md:mt-6 md:w-1/3">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Umumiy xaridlar narxi: </p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {totalAmount.toLocaleString("uz-UZ")} so'm
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <BasketCheckout />
            </div>
          </div>
          {/* desktop */}
          <div className="hidden mt-6 h-fit rounded-lg border md:block lg:block xl:block bg-white p-6 shadow-md md:mt-6 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Umumiy xaridlar narxi: </p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {/* {totalAmount.toLocaleString("uz-UZ")} so'm */}
                  {dataBasket?.total_price?.discount_price} 
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <BasketCheckout selectProduct={selectedUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
