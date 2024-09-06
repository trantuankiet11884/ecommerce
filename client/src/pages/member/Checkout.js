import React, { useEffect, useState } from "react";
import { payment } from "assets/js";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/fn";
import { Congratulation, Paypal } from "components";
import { withNavigate } from "hocs";
import { getCurrent } from "store/user/asyncActions";

const Checkout = ({ dispatch }) => {
  const { currentCart, current } = useSelector((state) => state.user);

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  return (
    <div className="w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-4">
      <div className="w-full flex  items-center col-span-4">
        {isSuccess && <Congratulation />}
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="w-full flex flex-col  col-span-6 gap-4 ">
        <h2 className="text-2xl font-semibold  capitalize">
          Checkout your order
        </h2>
        <div className="w-full flex gap-6 justify-between">
          <div className="w-full flex-1">
            <div className="flex-1">
              <table className="w-full h-fit table-auto p-2">
                <thead>
                  <tr className="border bg-gray-200 text-center p-2">
                    <th className="text-left">Product</th>
                    <th>Quantity</th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCart?.map((product) => (
                    <tr key={product?._id} className="border text-center p-2">
                      <td className="text-left">{product?.title}</td>
                      <td>{product?.quantity}</td>
                      <td className="text-right">
                        {formatMoney(product?.price) + " VNĐ"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-medium">Subtotal: </span>
              <span className="text-main font-bold">
                {formatMoney(
                  currentCart?.reduce(
                    (acc, item) => +acc + Number(item?.price) * item.quantity,
                    0
                  )
                ) + " VNĐ"}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">Address: </span>
                <span className="text-main font-bold">{current?.address}</span>
              </div>
            </div>

            <div className="w-full">
              <Paypal
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +currentCart?.reduce(
                    (sum, el) => +el?.price * el?.quantity + sum,
                    0
                  ) / 23500
                )}
                payload={{
                  products: currentCart,
                  orderBy: current?._id,
                  address: current?.address,
                  total: Math.round(
                    +currentCart?.reduce(
                      (sum, el) => +el?.price * el?.quantity + sum,
                      0
                    ) / 23500
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNavigate(Checkout);
