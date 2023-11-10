import React, { useEffect, useState } from "react";
import InputQuantity from "components/inputs/InputQuantity";
import { formatMoney } from "utils/fn";
import { updateCart } from "store/user/userSlice";
import { withNavigate } from "hocs";

const OrderItem = ({
  dispatch,
  color,
  defaultQuantity = 1,
  price,
  thumbnail,
  title,
  pid,
}) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity);
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

  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);
  return (
    <div className="w-main mx-auto border-b font-bold grid grid-cols-10 py-3 text-center">
      <span className="col-span-6 w-full">
        <div className="flex gap-2 px-4 py-3">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-28 h-28 object-cover"
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="font-bold text-sm">{title}</span>
            <span className="text-xs">{color}</span>
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
        {formatMoney(price * quantity) + " VNĐ"}
      </span>
    </div>
  );
};

export default withNavigate(OrderItem);
