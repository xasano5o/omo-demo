import React from "react";

const Cart = () => {
  return (
    <div className="container mx-auto mt-[100px] mb-[100px]">
      <div class="w-full h-[840px] flex-col justify-start items-start gap-20 inline-flex">
        <div class="flex-col justify-start items-start gap-6 flex">
          <div class="flex-col justify-start items-start gap-10 flex">
            <div class="w-[1170px] h-[72px] pl-10 pr-[39px] py-6 bg-white rounded shadow justify-center items-center inline-flex">
              <div class="justify-start items-center gap-[284px] inline-flex">
                <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Product
                </div>
                <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Price
                </div>
                <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Quantity
                </div>
                <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                  Subtotal
                </div>
              </div>
            </div>
            <div class="w-[1170px] h-[102px] relative bg-white rounded shadow">
              <div class="left-[387px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                $650
              </div>
              <div class="left-[1063px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                $650
              </div>
              <div class="w-[72px] h-11 px-3 py-1.5 left-[710px] top-[29px] absolute rounded border border-black border-opacity-40 justify-center items-center inline-flex">
                <div class="h-8 justify-start items-center gap-4 inline-flex">
                  <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                    01
                  </div>
                </div>
              </div>
              <div class="w-[54px] h-[54px] px-0.5 pt-2 pb-[7px] left-[40px] top-[24px] absolute justify-center items-center inline-flex">
                <img
                  class="w-[50px] h-[39px]"
                  src="https://via.placeholder.com/50x39"
                />
              </div>
              <div class="left-[114px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                LCD Monitor
              </div>
              <div class="w-6 h-6 left-[30px] top-[20px] absolute">
                <div class="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div class="w-[1170px] h-[102px] relative bg-white rounded shadow">
              <div class="left-[387px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                $550
              </div>
              <div class="left-[1063px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                $1100
              </div>
              <div class="w-[72px] h-11 px-3 py-1.5 left-[710px] top-[29px] absolute rounded border border-black border-opacity-40 justify-center items-center inline-flex">
                <div class="h-8 justify-start items-center gap-3 inline-flex">
                  <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                    02
                  </div>
                </div>
              </div>
              <div class="w-[54px] h-[54px] pl-[3px] pr-[2.12px] pt-1.5 pb-[5.78px] left-[40px] top-[24px] absolute justify-center items-center inline-flex">
                <img
                  class="w-[48.88px] h-[42.22px]"
                  src="https://via.placeholder.com/49x42"
                />
              </div>
              <div class="left-[114px] top-[39px] absolute text-black text-base font-normal font-['Poppins'] leading-normal">
                H1 Gamepad
              </div>
            </div>
          </div>
          <div class="justify-start items-start gap-[757px] inline-flex">
            <button class="px-12 py-4 rounded border border-black border-opacity-50 justify-center items-center gap-2.5 flex">
              <h1 class="text-black text-base font-medium font-['Poppins'] leading-normal">
                Return To Shop
              </h1>
            </button>
            <button class="px-12 py-4 rounded border border-black border-opacity-50 justify-center items-center gap-2.5 flex">
              <h1 class="text-black text-base font-medium font-['Poppins'] leading-normal">
                Update Cart
              </h1>
            </button>
          </div>
        </div>
        <div class="justify-start items-start gap-[173px] inline-flex">
          <div class="justify-start items-end gap-4 flex">
            <div class="">
              <input
                type="text"
                className="pl-6 pr-[164px] py-4 rounded border border-black justify-start items-center flex"
              />
            </div>
            <button class="px-12 py-4 bg-red-500 rounded justify-center items-center gap-2.5 flex">
              <div class="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                Apply Coupon
              </div>
            </button>
          </div>
          <div class="w-[470px] h-[324px] relative rounded border border-black">
            <div class="left-[24px] top-[32px] absolute text-black text-xl font-medium font-['Poppins'] leading-7">
              Cart Total
            </div>
            <div class="left-[24px] top-[84px] absolute justify-start items-start gap-[307px] inline-flex">
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                Subtotal:
              </div>
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                $1750
              </div>
            </div>
            <div class="left-[24px] top-[140px] absolute justify-start items-start gap-[314px] inline-flex">
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                Shipping:
              </div>
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                Free
              </div>
            </div>
            <div class="left-[24px] top-[196px] absolute justify-start items-start gap-[335px] inline-flex">
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                Total:
              </div>
              <div class="text-black text-base font-normal font-['Poppins'] leading-normal">
                $1750
              </div>
            </div>
            <div class="px-12 py-4 left-[89px] top-[236px] absolute bg-red-500 rounded justify-center items-center gap-2.5 inline-flex">
              <button class="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                Procees to checkout
              </button>
            </div>
            <div class="w-[422px] h-[0px] left-[24px] top-[124px] absolute opacity-40 justify-center items-center inline-flex">
              <div class="w-[422px] h-[0px] border border-black"></div>
            </div>
            <div class="w-[422px] h-[0px] left-[24px] top-[180px] absolute opacity-40 justify-center items-center inline-flex">
              <div class="w-[422px] h-[0px] border border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
