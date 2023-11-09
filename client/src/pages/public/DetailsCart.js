import { Breadcrumb, Button, InputQuantity } from "components";
import { withNavigate } from "hocs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/fn";

const DetailsCart = ({ location }) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(0);
  const handeQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handlePlusMinus = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") {
      setQuantity((prev) => +prev - 1);
    }
    if (flag === "plus") {
      setQuantity((prev) => +prev + 1);
    }
  };

  return (
    <div className="w-main">
      <div>
        <h3 className="font-bold uppercase text-lg"> My Cart</h3>
        <Breadcrumb category={location?.pathname} />
      </div>
      <div className="flex flex-col border rounded-md w-main mx-auto my-4 text-center">
        <div className="w-main mx-auto bg-main text-white font-bold py-3 grid grid-cols-10">
          <span className="col-span-6 w-full">Products</span>
          <span className="col-span-1 w-full">Quantity</span>
          <span className="col-span-3 w-full">Price</span>
        </div>
        {current?.cart?.map((item) => (
          <div
            key={item._id}
            className="w-main mx-auto border-b font-bold grid grid-cols-10 py-3 text-center"
          >
            <span className="col-span-6 w-full">
              <div className="flex gap-2 ">
                <img
                  src={item?.product?.thumbnail}
                  alt="thumbnail"
                  className="w-28 h-28 object-cover"
                />
                <div className="flex flex-col gap-1 items-start">
                  <span className="font-bold text-sm">
                    {item?.product?.title}
                  </span>
                  <span className="text-xs">{item.color}</span>
                </div>
              </div>
            </span>
            <span className="col-span-1 w-full">
              <div className="flex items-center h-full">
                <InputQuantity
                  quantity={quantity}
                  handeQuantity={handeQuantity}
                  handlePlusMinus={handlePlusMinus}
                />
              </div>
            </span>
            <span className="col-span-3 w-full text-lg h-full flex items-center justify-center">
              {formatMoney(item?.product?.price) + " VNĐ"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-main mx-auto flex items-end justify-end my-4 gap-3">
        <div>
          <p>
            <span>Subtoal: </span>
            <span className="text-black font-bold">
              {formatMoney(
                current?.cart?.reduce(
                  (acc, item) => acc + Number(item.product?.price),
                  0
                )
              ) + " VNĐ"}
            </span>
          </p>
          <div className="text-end my-3">
            <Button>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
{
}
export default withNavigate(DetailsCart);
