import React, { memo } from "react";

import Slider from "react-slick";
import { Product } from ".";
import { v4 as uuidv4 } from "uuid";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomeSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((item) => (
            <Product
              key={uuidv4()}
              pid={item.id}
              productsData={item}
              isNew={activeTab === 0 ? false : true}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomeSlider);
