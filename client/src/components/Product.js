import React, { useState } from "react";
import { formatMoney, renderStar } from "../utils/fn";
import { news, trending } from "../assets/js";
import SelectOption from "./SelectOption";
import icons from "../utils/icons";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productsData, isNew, pid }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-sm px-[10px]" key={productsData?.id}>
      <div
        className="w-full border p-4 flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute flex  bottom-[-10px] left-0 right-0 items-center justify-center g-4 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={productsData?.thumbnail || ""}
            alt="product"
            className="w-[200px] h-[200px] object-cover"
          />
          <img
            src={isNew ? news : trending}
            alt=""
            className="absolute w-[70px] top-[-16px] right-[-16px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4 items-start w-full">
          <span className="flex h-4">
            {renderStar(productsData?.totalRatings)}
          </span>
          <span className="line-clamp-1">{productsData?.title}</span>
          <span>{`${formatMoney(productsData?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
