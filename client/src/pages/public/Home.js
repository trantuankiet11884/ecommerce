import React from "react";
import {
  Banner,
  BestSellers,
  DealDaily,
  FeatureProducts,
  Sidebar,
  SliderProduct,
} from "../../components";
import Slider from "react-slick";

const Home = () => {
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
      <div className="flex my-4">
        <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase w-full">
          NEW ARRIVALS
        </h3>
        <div className="w-full">
        <SliderProduct />
        </div>
      </div>
    </>
  );
};

export default Home;
