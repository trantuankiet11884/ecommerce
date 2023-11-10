import Button from "components/buttons/Button";
import { withNavigate } from "hocs";
import React, { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { showCart } from "store/app/appSlice";
import { formatMoney } from "utils/fn";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import path from "utils/path";

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);

  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) dispatch(getCurrent());
    else toast.error(response.message);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] h-screen  bg-black text-white gap-10 p-6 grid grid-rows-10"
    >
      <header className="row-span-1 h-full border-b py-4 border-gray-500 flex justify-between items-center font-bold text-2xl">
        <span>Your Cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className="cursor-pointer p-2"
        >
          <AiFillCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-7 gap-2 h-full py-3 max-h-full overflow-y-auto">
        {!currentCart ? (
          <span className="text-xs text-main">Yourt Cart Is Empty</span>
        ) : (
          <div>
            {currentCart?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center gap-2"
              >
                <img
                  src={item?.thumbnail}
                  alt="thumbnail"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-2 border-b w-full">
                  <span className="font-bold text-sm">{item?.title}</span>
                  <span className="text-xs">{item?.color}</span>
                  <span className="text-xs font-bold">{`Quantity: ${item?.quantity}`}</span>
                  <span className="text-sm text-end">
                    {formatMoney(item?.price) + " VNĐ"}
                  </span>
                </div>
                <span
                  className="h-8 w-8 rounded-full cursor-pointer flex items-center justify-center hover:text-main"
                  onClick={() => removeCart(item.product?._id, item?.color)}
                >
                  <ImBin size={18} />
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
      <footer className="row-span-3 h-full border-t border-gray-500 py-4 flex flex-col justify-between">
        <div>
          <span>Subtotal: </span>
          <span className="font-bold">
            {formatMoney(
              currentCart?.reduce(
                (acc, item) => acc + Number(item?.price) * item.quantity,
                0
              )
            ) + " VNĐ"}
          </span>
        </div>
        <Button
          style="w-full bg-main rounded-md p-2"
          onOk={() => {
            dispatch(showCart());
            navigate(`/${path.MEMBER}/${path.CART}`);
          }}
        >
          Shopping Cart
        </Button>
      </footer>
    </div>
  );
};

export default withNavigate(memo(Cart));
