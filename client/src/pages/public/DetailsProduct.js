import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "apis";
import { Breadcrumb } from "components";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import { formatMoney, formatPrice, renderStar } from "utils/fn";
import Button from "components/buttons/Button";
import InputQuantity from "components/inputs/InputQuantity";
import { productExtraInfomation } from "utils/constant";
import { ProductExtraInfoItem, ProductInfomation } from "components";
import { CustomeSlider } from "components";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
import path from "utils/path";
import { withNavigate } from "hocs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailsProduct = ({
  isQuickView,
  data,
  location,
  dispatch,
  navigate,
}) => {
  const params = useParams();
  const { current } = useSelector((state) => state.user);
  const titleRef = useRef();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [varriant, setVarriant] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [pid, setPid] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentProduct, setcurrentProduct] = useState({
    title: "",
    thumbnail: "",
    images: [],
    price: "",
    color: "",
  });
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
    if (data) {
      setPid(data.pid);
      setCategory(data.catagory);
    } else if (params) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);

  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchProducts();
    }
    window.scrollTo(0, 0);
    titleRef.current.scrollIntoView({ block: "center" });
  }, [pid, params.pid]);

  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [update]);

  const updateCS = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    if (varriant) {
      setcurrentProduct({
        title: product?.varriants?.find((el) => el.SKU === varriant)?.title,
        color: product?.varriants?.find((el) => el.SKU === varriant)?.color,
        price: product?.varriants?.find((el) => el.SKU === varriant)?.price,
        images: product?.varriants?.find((el) => el.SKU === varriant)?.images,
        thumbnail: product?.varriants?.find((el) => el.SKU === varriant)
          ?.thumbnail,
      });
    } else {
      setcurrentProduct({
        title: product?.title,
        color: product?.color,
        images: product?.images || [],
        price: product?.price,
        thumbnail: product?.thumbnail,
      });
    }
  }, [varriant, product]);

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

  const handleAddToCart = async () => {
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
      pid: pid,
      color: currentProduct.color || product?.color,
      quantity,
      price: currentProduct.price || product?.price,
      thumbnail: currentProduct.thumbnail || product?.thumbnail,
      title: currentProduct.title || product?.title,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    } else toast.error(response.message);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full">
      {!isQuickView && (
        <div className="w-main">
          <h3 ref={titleRef} className="font-bold">
            {currentProduct?.title || product?.title}
          </h3>
          <Breadcrumb
            title={currentProduct?.title || product?.title}
            category={category}
          />
        </div>
      )}
      <div
        className={clsx(
          " bg-white rounded-md mt-5 flex gap-2",
          isQuickView
            ? "max-w-[900px] mx-auto max-h-80vh overflow-y-auto"
            : "w-main"
        )}
      >
        <div
          className={clsx("flex-4 flex flex-col gap-4", isQuickView && "w-1/2")}
        >
          <div className="w-[450px] h-[450px] border overflow-hidden">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "product",
                  isFluidWidth: true,
                  src: currentProduct.thumbnail || currentImage,
                },
                largeImage: {
                  src: currentProduct.thumbnail || currentImage,
                  width: 1200,
                  height: 1000,
                },
              }}
            />
          </div>

          <div className={clsx("w-[450px] mx-2")}>
            <Slider {...settings} className="flex gap-2 justify-between">
              {currentProduct.images.length === 0 &&
                product?.images?.map((item) => (
                  <div className="px-2" key={item}>
                    <img
                      src={item}
                      alt="sub-images"
                      onClick={(e) => handleChangeImage(e, item)}
                      className="h-[145px] w-[145px] border object-cover"
                    />
                  </div>
                ))}
              {currentProduct.images.length > 0 &&
                currentProduct.images?.map((item) => (
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
              formatPrice(currentProduct.price || product?.price)
            )} VNĐ`}</h2>
            <span className="text-xs text-main">{`In Stock: ${product?.quantity} item`}</span>
          </div>
          <div className="flex">
            {renderStar(product?.totalRatings)?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <ul className="list-square text-sm text-gray-500 pl-4">
            {product?.description?.length > 1 &&
              product?.description?.map((item) => <li key={item}>{item}</li>)}
            {product?.description?.length === 1 && (
              <div
                className="text-sm line-clamp-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>

          <div className="my-4 flex gap-4">
            <span className="font-bold">Color: </span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => setVarriant(null)}
                className={clsx(
                  "flex items-center gap-2 p-2 border cursor-pointer",
                  !varriant && "border-main"
                )}
              >
                <img
                  src={product?.thumbnail}
                  alt="thumb"
                  className="w-8 h-8 rounded-md object-contain"
                />
                <span className="flex flex-col">
                  <span> {product?.color}</span>
                  <span className="text-sm">{product?.price}</span>
                </span>
              </div>

              {product?.varriants?.map((el) => (
                <div
                  onClick={() => setVarriant(el.SKU)}
                  className={clsx(
                    "flex items-center gap-2 p-2 border cursor-pointer",
                    varriant === el.SKU && "border-main"
                  )}
                  key={el.SKU}
                >
                  <img
                    src={el?.thumbnail}
                    alt="thumb"
                    className="w-8 h-8 rounded-md object-contain"
                  />
                  <span className="flex flex-col">
                    <span> {el?.color}</span>
                    <span className="text-sm">{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <InputQuantity
                quantity={quantity}
                handeQuantity={handeQuantity}
                handlePlusMinus={handlePlusMinus}
              />
            </div>
            <Button onOk={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
        {!isQuickView && (
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
        )}
      </div>
      {!isQuickView && (
        <>
          <div className="mt-8">
            <ProductInfomation
              totalRatings={product?.totalRatings}
              ratings={product?.ratings}
              nameProduct={product?.title}
              pid={product?._id}
              updateCS={updateCS}
            />
          </div>
          <div className="my-8">
            <h3 className="text-lg font-semibold py-4 border-b-2 border-main uppercase w-full">
              ORTHER CUSTOMER ALSO LIKED
            </h3>
            <CustomeSlider products={relatedProducts} normal={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default withNavigate(DetailsProduct);
