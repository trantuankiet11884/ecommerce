import React, { memo, useState } from "react";
import { formatMoney, renderStar } from "utils/fn";
import { news, trending } from "assets/js";
import { SelectOption } from "components";
import icons from "utils/icons";
import { withNavigate } from "hocs";
import { showModal } from "store/app/appSlice";
import { DetailsProduct } from "pages/public";
import { apiUpdateCart } from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "utils/path";
import { createSearchParams } from "react-router-dom";
const { AiFillEye, BsFillSuitHeartFill, BsCartPlus, BsFillCartCheckFill } =
  icons;

const Product = ({
  productsData,
  isNew,
  normal,
  navigate,
  dispatch,
  location,
}) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  const handleClickOptions = async (e, option) => {
    e.stopPropagation();

    if (option === "cart") {
      if (!current)
        return Swal.fire({
          title: "Almost...",
          text: "Login, plsssss!!!",
          icon: "info",
          showConfirmButton: "true",
          showCancelButton: "Not Now !!!",
          confirmButtonText: "Go Login !!!",
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: path.LOGIN,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      const response = await apiUpdateCart({
        pid: productsData?._id,
        color: productsData?.color,
        quantity: 1,
        price: productsData?.price,
        thumbnail: productsData?.thumbnail,
        title: productsData?.title,
      });
      if (response.success) {
        toast.success(response.message);
        dispatch(getCurrent());
      } else toast.error(response.message);
    }
    if (option === "wishlist") console.log("wishlist");
    if (option === "view") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailsProduct
              isQuickView={true}
              data={{
                pid: productsData?._id,
                category: productsData?.category,
              }}
            />
          ),
        })
      );
    }
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
              <span
                title="Quick View"
                onClick={(e) => handleClickOptions(e, "view")}
              >
                <SelectOption icon={<AiFillEye />} />
              </span>
              {current?.cart?.some((el) => el.product === productsData?._id) ? (
                <span title="Add to Cart">
                  <SelectOption icon={<BsFillCartCheckFill />} />
                </span>
              ) : (
                <span
                  title="Add to Cart"
                  onClick={(e) => handleClickOptions(e, "cart")}
                >
                  <SelectOption icon={<BsCartPlus />} />
                </span>
              )}
              <span
                title="Add to Wishlist"
                onClick={(e) => handleClickOptions(e, "wishlist")}
              >
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
