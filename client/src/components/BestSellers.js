import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import SliderProduct from "./SliderProduct";
import { getNewProducts } from "../store/products/asyncAction";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 0, name: "best sellers", sort: "-sold" },
  { id: 1, name: "new arrivals", sort: "-createdAt" },
];

const BestSellers = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  // const { newProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetProducts({ sort: tabs[activeTab].sort });
      if (response.success) {
        setProducts(response.products);
      }
    };
    fetchData();
    dispatch(getNewProducts());
  }, [activeTab]);

  return (
    <div>
      <div className="flex text-lg gap-8 pb-4 border-b-2 border-main">
        {tabs.map((item) => (
          <span
            className={`cursor-pointer font-semibold text-gray-400 uppercase ${
              activeTab === item.id ? "text-black" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
            key={item.id}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <SliderProduct products={products} activeTab={activeTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner1"
          className="flex-1 object-contain"
          width={360}
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner2"
          className="flex-1 object-contain"
          width={360}
        />
      </div>
    </div>
  );
};

export default BestSellers;
