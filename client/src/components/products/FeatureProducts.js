import React, { useEffect, useState } from "react";
import { apiGetProducts } from "apis";
import ProductCard from "./ProductCard";

const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({
      limit: 9,
      sort: "-totalRatings",
    });
    if (response.success) {
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase">
        Featured Products
      </h3>
      <div className="flex flex-wrap mt-4">
        {products?.map((item) => (
          <ProductCard
            key={item._id}
            image={item.thumbnail}
            title={item.title}
            totalRatings={item.totalRatings}
            price={item.price}
            pid={item._id}
            {...item}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-full hover:animate-scale-up-center h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
          alt=""
          className="w-full hover:animate-scale-up-center h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-full hover:animate-scale-up-center h-full object-cover col-span-1 row-span-2"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
          alt=""
          className="w-full hover:animate-scale-up-center h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
