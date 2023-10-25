import React, { memo } from "react";

const InputQuantity = ({ quantity, handeQuantity, handlePlusMinus }) => {
  return (
    <div className="flex items-center">
      <span
        className="text-lg cursor-pointer p-2 border-r border-black"
        onClick={() => handlePlusMinus("minus")}
      >
        -
      </span>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => handeQuantity(e.target.value)}
        className="py-2 outline-none w-12"
      />
      <span
        className="text-lg cursor-pointer p-2 border-l border-black"
        onClick={() => handlePlusMinus("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(InputQuantity);
