import { apiAddVarriants } from "apis";
import Button from "components/buttons/Button";
import Loading from "components/common/Loading";
import InputForm from "components/inputs/InputForm";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "utils/fn";

const CustomizeVarriants = ({
  setCustomizeVarriants,
  customizeVarriants,
  render,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });

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
      thumbnail: customizeVarriants?.thumbnail || "",
      images: customizeVarriants?.images || [],
    });
  };

  useEffect(() => {
    reset({
      title: customizeVarriants?.title,
      price: customizeVarriants?.price,
      color: customizeVarriants?.color,
    });
  }, [customizeVarriants]);

  useEffect(() => {
    if (watch("thumbnail") instanceof FileList && watch("thumbnail").length > 0)
      handlePreviewThumb(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImgProduct(watch("images"));
  }, [watch("images")]);

  const handleAddVarriants = async (data) => {
    if (data.color === customizeVarriants.color)
      Swal.fire("Oops !!!", "Color have must changed", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);

      if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);

      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVarriants(formData, customizeVarriants._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.message);
        reset();
        setPreview({ thumbnail: "", images: [] });
      } else toast.error(response.message);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="h-20 flex justify-between items-center text-3xl font-semibold">
          Varriants
        </h1>
        <button
          onClick={() => setCustomizeVarriants(null)}
          className="p-2 bg-black rounded-md text-white"
        >
          Back
        </button>
      </div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleAddVarriants)}
      >
        <div className="w-full flex gap-4">
          <InputForm
            register={register}
            errors={errors}
            id="title"
            fullWidth
            validate={{
              required: "Required Fill !!!",
            }}
            placeholder="Title of Varriant..."
            styles="flex-1 h-9"
          />
        </div>
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
            id="color"
            validate={{
              required: "Required Fill !!!",
            }}
            styles="flex-1 h-9"
            placeholder="Color..."
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
        <div className="my-4">
          <Button type="submit">Add Varriants</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(CustomizeVarriants);
