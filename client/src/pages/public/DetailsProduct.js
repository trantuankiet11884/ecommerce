import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "apis";
import { Breadcrumb } from "components";
import ReactImageMagnify from "react-image-magnify";

import Slider from "react-slick";
import { formatMoney, formatPrice, renderStar } from "utils/fn";
import Button from "components/buttons/Button";
import InputQuantity from "components/inputs/InputQuantity";
import { productExtraInfomation } from "utils/constant";
import { ProductExtraInfoItem, ProductInfomation } from "components";
import { CustomeSlider } from "components";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailsProduct = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProduct = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumbnail);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.products);
  };

  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [update]);

  const updateCS = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handeQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },

    [quantity]
  );
  const handlePlusMinus = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      }
      if (flag === "plus") {
        setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );
  const handleChangeImage = (e, item) => {
    e.stopPropagation();
    setCurrentImage(item);
  };
  return (
    <div className="w-full">
      <div className="w-main">
        <h3 className="font-bold">{title}</h3>
        <Breadcrumb title={title} category={category} />
      </div>
      <div className="w-main mt-5 flex gap-2">
        <div className="flex-4 flex flex-col gap-4">
          <div className="w-[450px] h-[450px] border overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: currentImage,
                },
                largeImage: {
                  src: currentImage,
                  width: 1200,
                  height: 1000,
                },
              }}
            />
          </div>

          <div className="w-[450px] mx-2">
            <Slider {...settings} className="flex gap-2 justify-between">
              {product?.images?.map((item) => (
                <div className="px-2" key={item}>
                  <img
                    src={item}
                    alt="sub-images"
                    onClick={(e) => handleChangeImage(e, item)}
                    className="h-[145px] w-[145px] border object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{`${formatMoney(
              formatPrice(product?.price)
            )} VNĐ`}</h2>
            <span className="text-xs text-main">{`In Stock: ${product?.quantity} item`}</span>
          </div>
          <div className="flex">
            {renderStar(product?.totalRatings)?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <ul className="list-square text-sm text-gray-500 pl-4">
            {product?.description?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <InputQuantity
                quantity={quantity}
                handeQuantity={handeQuantity}
                handlePlusMinus={handlePlusMinus}
              />
            </div>
            <Button>Add to Cart</Button>
          </div>
        </div>
        <div className="flex-2">
          {productExtraInfomation.map((item) => (
            <ProductExtraInfoItem
              key={item.id}
              title={item.title}
              sub={item.sub}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <ProductInfomation
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          updateCS={updateCS} // Make sure you pass the correct function
        />
      </div>
      <div className="my-8">
        <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase w-full">
          ORTHER CUSTOMER ALSO LIKED
        </h3>
        <CustomeSlider products={relatedProducts} normal={true} />
      </div>
    </div>
  );
};

export default DetailsProduct;
