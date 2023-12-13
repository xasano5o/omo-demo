import React from 'react'
import { useDeleteBasketMutation, useGetBasketQuery } from '../../redux/slice/client/basket'

const Basket = () => {
  const { data } = useGetBasketQuery()
  const [deleteBasket] = useDeleteBasketMutation()

  // const deleteBasket = (id) => {
  //   deleteBasket()

  // }



  const deleteFunc = async (id) => {
    try {
      await deleteBasket({ id });
    } catch (err) {
    }
  };

  const increment =() =>{

  }

  const decrement =() =>{

  }

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mx-auto max-w-7xl px-6  text-2xl font-bold">Savatga OLingan Maxsulodlar</h1>
        <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 p-4 flex flex-col gap-2 h-[85vh] overflow-x-auto">
            {data?.map((value) => {
              return (
                <>
                  <div className="justify-between mb-2 rounded-lg bg-white  shadow-md sm:flex sm:justify-start">
                    <img src={value.product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between p-3">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{value.product.title}</h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {value.product.description.length > 100
                            ? `${value.product.description.substring(0, 70)}...`
                            : value.product.description}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className='flex gap-4'>
                          <div className="flex items-center border-gray-100">
                            <span 
                             onClick={() => increment(-1)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" value={value.amount} min="1" />
                            <span 
                              onClick={() => decrement(+1)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                          </div>
                       
                          <select>
                          <option value="10">0</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>

                        <div>
        
                        </div>

                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {value.product.price.toLocaleString('uz-UZ')} so'm
                          </p>
                          <svg onClick={() => deleteFunc(value.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>


              )
            })}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
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
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket