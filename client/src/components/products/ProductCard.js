import { withNavigate } from "hocs";
import React from "react";
import { formatMoney, renderStar } from "utils/fn";
import path from "utils/path";

const ProductCard = ({
  image,
  price,
  totalRatings,
  title,
  pid,
  navigate,
  category,
}) => {
  return (
    <div
      className="w-1/3 flex-auto mb-[10px] cursor-pointer"
      onClick={() => navigate(`/${category?.toLowerCase()}/${pid}/${title}}`)}
    >
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

export default withNavigate(ProductCard);
