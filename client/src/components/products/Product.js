import React, { memo, useState } from "react";
import { formatMoney, renderStar } from "utils/fn";
import { news, trending } from "assets/js";
import { SelectOption } from "components";
import icons from "utils/icons";
import { Link } from "react-router-dom";
import { withNavigate } from "hocs";
import path from "utils/path";
const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productsData, isNew, pid, normal, navigate }) => {
  const [isShowOption, setIsShowOption] = useState(false);

  const handleClickOptions = (e, option) => {
    e.stopPropagation();

    if (option === "menu")
      navigate(
        `/${productsData?.category.toLowerCase()}/${productsData?._id}/${
          productsData?.title
        }`
      );

    if (option === "wishlist") console.log("wishlist");
    if (option === "view") console.log("view");
  };

  return (
    <div className="w-full text-sm px-[10px]" key={productsData?.id}>
      <div
        onClick={() =>
          navigate(
            `/${productsData?.category.toLowerCase()}/${productsData?._id}/${
              productsData?.title
            }`
          )
        }
        className="w-full p-4 flex-col items-center cursor-pointer"
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
              <span onClick={(e) => handleClickOptions(e, "view")}>
                <SelectOption icon={<AiFillEye />} />
              </span>
              <span onClick={(e) => handleClickOptions(e, "menu")}>
                <SelectOption icon={<AiOutlineMenu />} />
              </span>
              <span onClick={(e) => handleClickOptions(e, "wishlist")}>
                <SelectOption icon={<BsFillSuitHeartFill />} />
              </span>
            </div>
          )}
          <img
            src={productsData?.thumbnail || ""}
            alt="product"
            className="w-[200px] h-[200px] object-cover"
          />
          {!normal && (
            <img
              src={isNew ? news : trending}
              alt=""
              className="absolute w-[70px] top-[-16px] right-[-16px] object-contain"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 mt-4 items-start w-full">
          <span className="flex h-4">
            {renderStar(productsData?.totalRatings)?.map((el, idx) => (
              <span key={idx}>{el}</span>
            ))}
          </span>
          <span className="line-clamp-1">{productsData?.title}</span>
          <span>{`${formatMoney(productsData?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default withNavigate(memo(Product));
