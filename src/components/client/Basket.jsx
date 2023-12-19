import React, { useEffect, useState } from "react";
import {
  useDeleteBasketMutation,
  useGetBasketQuery,
  useIncrementMutation,
} from "../../redux/slice/client/basket";
import BasketCheckout from "./BasktChecout";

const Basket = () => {
  const { data: dataBasket } = useGetBasketQuery();
  const [deleteBasket] = useDeleteBasketMutation();
  const [Increment] = useIncrementMutation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(true); // Set the initial state to true
  const [selectTotal, setSelectTotal] = useState(1);

  const deleteFunc = async (id) => {
    try {
      await deleteBasket({ id });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleSelectAmount = async (e) => {
    const newAmount = e?.target?.value;
    setSelectTotal(newAmount);

    const formData = new FormData();
    formData.append("amount", newAmount);

    try {
      await Increment(formData).unwrap();
    } catch (error) {
      console.error("Error incrementing item:", error);
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

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(dataBasket)) {
        const total = dataBasket.reduce(
          (a, b) => a + (b?.total_price?.price || 0) * b.amount,
          0
        );
        setTotalAmount(total);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [dataBasket]);

  const selectAll = () => {
    const allUserIds = dataBasket.map((user) => user.id);
    setIsAllSelected(!isAllSelected);
    setSelectedUsers(isAllSelected ? [] : allUserIds);
  };

  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user.id)) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id]);
    }

    // Update isAllSelected based on whether all users are selected
    setIsAllSelected(selectedUsers.length === dataBasket.length);
  };
  const isUserSelected = (user) => {
    return selectedUsers.includes(user.id);
  };

  const isAllUsersSelected = () => {
    return selectedUsers.length === dataBasket.length;
  };

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          Savatga OLingan Maxsulodlar {dataBasket?.length}{" "}
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
            {dataBasket?.map((value) => (
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
                <img
                  src={value?.product?.image}
                  alt="product-image"
                  className="w-full rounded-lg md:ml-7 lg:ml-7 xl:ml-7 sm:w-40 object-contain"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between p-3">
                <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {value?.product?.title}
                        </h2>
                        <p className="mt-1 text-base text-gray-700">
                          {value.product?.description?.length > 100
                            ? `${value?.product?.description.substring(
                                0,
                                70
                              )}...`
                            : value?.product?.description}
                        </p>
                      </div>
                  <div className="flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
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
                    <div className="flex gap-4">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => decrement(value)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
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
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <select onChange={handleSelectAmount}>
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
                      <p className="text-sm">
                        {value?.total_price?.discount_price?.toLocaleString(
                          "uz-UZ"
                        )}{" "}
                        so'm
                      </p>
                      <del>
                        {value?.product?.price.toLocaleString("uz-UZ")} so'm
                      </del>
                    </div>
                  </div>
                </div>
              </div>
            ))}
             {/* mobile */}
             <div className="mt-6 h-full rounded-lg border md:hidden xl:hidden lg:hidden bg-white p-6 shadow-md md:mt-6 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700"></p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
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
          <div className="hidden mt-6 h-full rounded-lg border md:block lg:block xl:block bg-white p-6 shadow-md md:mt-6 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700"></p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
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
      </div>
    </div>
  );
};

export default Basket;
