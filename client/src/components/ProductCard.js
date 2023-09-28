import React from "react";
import { formatMoney, renderStar } from "../utils/fn";

const ProductCard = ({ image, price, totalRatings, title }) => {
  return (
    <div className="w-1/3 flex-auto mb-[10px]">
      <div className="flex w-full border p-1">
        <img src={image} alt="products" className="w-[90px] object-contain" />
        <div className="flex flex-col gap-1 mt-4 items-start w-full">
          <span className="line-clamp-1">{title}</span>
          <span className="flex h-4">
            {renderStar(totalRatings, 12)?.map((el, idx) => (
              <span key={idx}>{el}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
