import { Button, Product } from "components";
import React from "react";
import { useSelector } from "react-redux";

const WishList = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div>
      <header className="text-3xl font-semibold ">My Wishlist</header>
      <div className="w-full flex flex-wrap gap-4">
        {current?.wishList?.map((el) => (
          <div
            key={el._id}
            className="bg-white rounded-md w-[250px] drop-shadow flex flex-col mt-3 gap-3"
          >
            <Product pid={el._id} productsData={el} normal={true} />
            {/* <div className="px-3 py-3">
              <Button>Add to cart</Button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
