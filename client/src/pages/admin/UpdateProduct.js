import React, { memo, useCallback, useEffect, useState } from "react";
import { Button, InputForm, Loading, MarkDownEditor, Select } from "components";
import { useForm } from "react-hook-form";
import { getBase64 } from "utils/fn";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { apiUpdateProduct } from "apis";
const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const { categories } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [payload, setPayload] = useState({
    description: "",
  });

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });

  const [invalidField, setInvalidField] = useState([]);

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumbnail: base64Thumb }));
  };

  const handlePreviewImgProduct = async (files) => {
    const imgPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported !!!");
        return;
      }
      const base64 = await getBase64(file);
      imgPreview.push(base64);
    }

    setPreview((prev) => ({ ...prev, images: imgPreview }));
    setPreview({
      thumbnail: editProduct?.thumbnail || "",
      images: editProduct?.images || [],
    });
  };

  const handleUpdateProduct = async (data) => {
    if (data.category)
      data.category = categories?.find(
        (el) => el.title === data.category
      )?.title;

    const finalPayload = { ...data, ...payload };

    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    if (finalPayload.thumbnail)
      formData.append(
        "thumbnail",
        finalPayload.thumbnail?.length === 0
          ? preview.thumbnail
          : finalPayload.thumbnail[0]
      );

    if (finalPayload.images) {
      const images =
        finalPayload.image?.length === 0 ? preview.images : finalPayload.images;
      for (let image of images) formData.append("images", image);
    }

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiUpdateProduct(formData, editProduct._id);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      toast.success(response.message);
      render();
      setEditProduct(null);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (watch("thumbnail") instanceof FileList && watch("thumbnail").length > 0)
      handlePreviewThumb(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImgProduct(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand?.toLowerCase() || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description?.join(", ")
          : editProduct?.description,
    });
  }, [editProduct]);

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="h-20 flex justify-between items-center text-3xl font-semibold">
          Update Products
        </h1>
        <button
          onClick={() => setEditProduct(null)}
          className="p-2 bg-black rounded-md text-white"
        >
          Back
        </button>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Required Fill !!!",
            }}
            fullWidth
            placeholder="Name..."
          />
          <div className="w-full flex gap-4">
            <InputForm
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Required Fill !!!",
              }}
              styles="flex-1 h-9"
              placeholder="Price..."
              type="number"
            />
            <InputForm
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Required Fill !!!",
              }}
              styles="flex-1 h-9"
              placeholder="Quantity..."
              type="number"
            />
            <InputForm
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Required Fill !!!",
              }}
              styles="flex-1 h-9"
              placeholder="Color..."
            />
          </div>
          <div className="w-full flex gap-4 mt-8">
            <Select
              options={categories?.map((category) => ({
                code: category?.title,
                value: category?.title,
              }))}
              id="category"
              validate={{
                required: "Required Fill !!!",
              }}
              errors={errors}
              register={register}
              styles="flex-auto"
              fullWidth
            />
            <Select
              options={categories
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
              id="brand"
              errors={errors}
              validate={{
                required: "Required Fill !!!",
              }}
              register={register}
              styles="flex-auto"
              fullWidth
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="thumbnail" className="font-semibold">
              Upload Image Thumb
            </label>
            <input type="file" id="thumbnail" {...register("thumbnail")} />
            {errors["thumbnail"] && (
              <small className="text-xs text-main">
                {errors["thumbnail"]?.message}
              </small>
            )}
          </div>

          {preview.thumbnail && (
            <div className="my-4">
              <img
                src={preview.thumbnail}
                alt="thumbnail"
                className="w-52 h-[110px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="images" className="font-semibold">
              Upload Images of Product
            </label>
            <input type="file" id="images" multiple {...register("images")} />
            {errors["images"] && (
              <small className="text-xs text-main">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-2 flex-wrap">
              {preview.images?.map((img, idx) => (
                <div className="w-fit relative" key={idx}>
                  <img
                    src={img}
                    alt="product"
                    className="w-52 h-[110px] object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <MarkDownEditor
              name="description"
              changeValue={changeValue}
              label="Description"
              invalidField={invalidField}
              setInvalidField={setInvalidField}
              value={payload.description}
            />
          </div>
          <div className="my-4">
            <Button type="submit">Create New Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
