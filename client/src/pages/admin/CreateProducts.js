import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Loading, MarkDownEditor, Select } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from "utils/fn";
import { toast } from "react-toastify";
import { apiCreateProduct } from "apis";
import { showModal } from "store/app/appSlice";

const CreateProducts = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.appReducer);
  const [hoverElm, setHoverElm] = useState(null);
  const [invalidField, setInvalidField] = useState([]);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

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
      imgPreview.push({ name: file.name, path: base64 });
    }
    if (imgPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imgPreview }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);

  useEffect(() => {
    handlePreviewImgProduct(watch("images"));
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    if (data.category)
      data.category = categories?.find((el) => el._id === data.category)?.title;
    const finalPayload = { ...data, ...payload };

    const formData = new FormData();

    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

    if (finalPayload.thumbnail)
      formData.append("thumbnail", finalPayload.thumbnail[0]);

    if (finalPayload.images) {
      for (let image of finalPayload.images) formData.append("images", image);
    }

    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateProduct(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      toast.success(response.message);
      reset();
      setPayload({
        thumbnail: "",
        images: [],
      });
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="h-20 flex justify-between items-center text-3xl font-semibold">
        <span>Create New Products</span>
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                code: category?._id,
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
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({ code: el, value: el }))}
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
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail", { required: "Required Fill !!!" })}
            />
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
            <input
              type="file"
              id="images"
              multiple
              {...register("images", { required: "Required Fill !!!" })}
            />
            {errors["images"] && (
              <small className="text-xs text-main">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-2 flex-wrap">
              {preview.images?.map((img, idx) => (
                <div
                  // onMouseEnter={() => setHoverElm(img.name)}
                  // onMouseLeaver={() => setHoverElm(null)}
                  className="w-fit relative"
                  key={idx}
                >
                  <img
                    src={img.path}
                    alt="product"
                    className="w-52 h-[110px] object-contain"
                  />
                  {/* {hoverElm === img.name && (
                    <div
                      className="animate-scale-up-center absolute flex items-center justify-center inset-0 bg-overlay"
                      onClick={() => handleRemoveImage(img.name)}
                    >
                      <RiDeleteBin2Fill size={48} color="white" />
                    </div>
                  )} */}
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

export default CreateProducts;
