import React, { memo, useEffect } from "react";
import { Button, InputForm } from "components";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { avatarJoke } from "assets/js";
import { apiUpdateCurrentUser } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { withNavigate } from "hocs";

const Personal = ({ navigate }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  const { current } = useSelector((state) => state.user);
  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, []);

  const handleUpdate = async (data) => {
    const formData = new FormData();

    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateCurrentUser(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else toast.error(response.message);
  };

  return (
    <div className="w-full relative p-4">
      <header className="text-3xl font-semibold ">Personal</header>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="w-3/5 mx-auto  flex flex-col gap-2"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="">
            <label htmlFor="file">
              <img
                src={current?.avatar || avatarJoke}
                alt="avatar"
                className="w-10 h-10 object-cover rounded-full"
              />
            </label>
            <input type="file" id="file" {...register("avatar")} hidden />
          </span>
        </div>

        <div className="w-full flex gap-2 justify-center items-center">
          <InputForm
            label="First Name"
            register={register}
            errors={errors}
            id="firstName"
            validate={{
              required: "Required Fill !!!",
            }}
            fullWidth
          />
          <InputForm
            label="Last Name"
            register={register}
            errors={errors}
            id="lastName"
            validate={{
              required: "Required Fill !!!",
            }}
            fullWidth
          />
        </div>
        <div className="w-full flex gap-2 justify-center items-center">
          <InputForm
            label="Email"
            register={register}
            errors={errors}
            id="email"
            validate={{
              required: "Required Fill !!!",
            }}
            fullWidth
          />
          <InputForm
            label="Phone"
            register={register}
            errors={errors}
            id="mobile"
            validate={{
              required: "Required Fill !!!",
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: "Phone Only 10 Numbers !!!",
              },
            }}
            fullWidth
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <InputForm
            label="Address"
            register={register}
            errors={errors}
            id="address"
            validate={{
              required: "Required Fill !!!",
            }}
            fullWidth
          />
        </div>

        {isDirty && (
          <div className="flex justify-center items-center">
            <Button type="submit">Update Infomation</Button>
          </div>
        )}
      </form>
      {/* <div className="w-3/5 mx-auto  flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Account Status:</span>
          <span>{current?.isBlocked ? "Blocked" : "Active"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span>{+current?.role === 1 ? "Admin" : "User"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">CreatedAt:</span>
          <span>{moment(current?.createdAt).format("DD/MM/YYYY")}</span>
        </div>
      </div> */}
    </div>
  );
};

export default withNavigate(memo(Personal));
