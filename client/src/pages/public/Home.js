import React from "react";
import {
  Banner,
  BestSellers,
  DealDaily,
  FeatureProducts,
  CustomeSlider,
  Sidebar,
} from "../../components";
import { useSelector } from "react-redux";
import icon from "../../utils/icons";
const { IoIosArrowForward } = icon;
const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.appReducer);

  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSellers />
        </div>
      </div>
      <div className="flex my-4">
        <FeatureProducts />
      </div>
      <div className="flex my-4 w-full">
        <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase w-full">
          NEW ARRIVALS
        </h3>
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomeSlider products={newProducts} />
      </div>
      <div className="flex flex-wrap my-4 w-full">
        <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase w-full">
          Hot Collections
        </h3>
        <div className=" mt-4 flex flex-wrap gap-4 w-full justify-between">
          {categories.map((el) => (
            <div key={el._id} className="w-1/4">
              <div className="border flex p-4 gap-4 min-h-[202px]">
                <img
                  src={el?.image}
                  alt="categories"
                  className="flex-1 w-[90px] h-[129px] object-cover"
                />
                <div className="flex-1 text-gray-700">
                  <h4 className="font-semibold uppercase">{el.title}</h4>
                  <ul className="text-sm">
                    {el?.brand.map((item) => (
                      <span className="flex gap-2 items-center" key={item}>
                        <IoIosArrowForward size={14} />
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-8 w-full">
          <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main uppercase">
            Blog posts
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;
