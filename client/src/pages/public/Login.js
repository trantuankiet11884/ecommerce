import React, { useCallback, useEffect, useState } from "react";
import { Button, InputField, Loading } from "components";
import { useNavigate } from "react-router-dom";
import {
  apiFinalRegister,
  apiForgotPassword,
  apiLogin,
  apiRegister,
} from "apis/user";
import Swal from "sweetalert2";
import path from "utils/path";
import { login } from "store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "utils/fn";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const [invalidForm, setInvalidForm] = useState([]);

  const resetForm = () => {
    setForm({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
    });
  };

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = form;
    const invalids = isRegister
      ? validate(form, setInvalidForm)
      : validate(data, setInvalidForm);

    try {
      if (invalids === 0) {
        if (isRegister) {
          // dispatch(
          //   showModal({ isShowModal: true, modalChildren: <Loading /> })
          // );
          const response = await apiRegister(form);
          // dispatch(showModal({ isShowModal: false, modalChildren: null }));
          if (response.success) {
            setShowModalFormRegister(true);
          } else {
            Swal.fire("Oops !!!", response.message, "error");
          }
        } else {
          const response = await apiLogin(data);
          if (response.success) {
            dispatch(
              login({
                isLoggedIn: true,
                token: response.accessToken,
                userData: response.userData,
              })
            );
            navigate(`/${path.HOME}`);
          } else {
            Swal.fire("Oops !!!", response.message, "error");
          }
        }
      }
    } catch (error) {
      Swal.fire(
        "Oops !!!",
        "An error occurred while processing your request.",
        "error"
      );
    }
  }, [form, isRegister, navigate]);

  const sendMailForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.warning(response.message);
    }
  };

  useEffect(() => {
    resetForm();
  }, [isRegister]);
  const [showModalFormRegister, setShowModalFormRegister] = useState(false);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulations !!!", response.message, "success").then(() => {
        setIsRegister(false);
        resetForm();
      });
    } else Swal.fire("Oops !!!", response.message, "error");
    setShowModalFormRegister(false);
    setToken("");
  };

  return (
    <div className="w-main flex items-center justify-center flex-col gap-2">
      {showModalFormRegister && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay flex justify-center items-center py-8 z-50">
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-black py-2">
              <input
                className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-white text-white"
                type="text"
                placeholder="Register Code Here !!!"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button
                className=" text-sm border-4 text-white py-1 px-2 rounded"
                onOk={finalRegister}
              >
                Submit
              </Button>
              <button
                className=" border-transparent border-4  text-sm py-1 px-2 rounded"
                type="button"
                onClick={() => setShowModalFormRegister(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay flex justify-center items-center py-8 z-50">
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-black py-2">
              <input
                className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-white text-white"
                type="text"
                placeholder="Example: abc123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className=" text-sm border-4 text-white py-1 px-2 rounded"
                onOk={sendMailForgotPassword}
              >
                Submit
              </Button>
              <button
                className=" border-transparent border-4  text-sm py-1 px-2 rounded"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="rounded-md min-w-[500px] text-center text-lg font-semibold text-main">
        {isRegister ? "Register" : "Login"}
      </div>
      <div className="flex flex-col gap-5 ">
        {isRegister && (
          <>
            <div className="flex gap-2">
              <div className="">
                <InputField
                  value={form.firstName}
                  nameKey="firstName"
                  setValue={setForm}
                  invalidForm={invalidForm}
                  setInvalidForm={setInvalidForm}
                />
              </div>
              <div>
                <InputField
                  value={form.lastName}
                  nameKey="lastName"
                  setValue={setForm}
                  invalidForm={invalidForm}
                  setInvalidForm={setInvalidForm}
                />
              </div>
            </div>
            <div>
              <InputField
                value={form.mobile}
                nameKey="mobile"
                setValue={setForm}
                type="mobile"
                invalidForm={invalidForm}
                setInvalidForm={setInvalidForm}
              />
            </div>
          </>
        )}
        <div className="w-full flex flex-col gap-5">
          <InputField
            value={form.email}
            nameKey="email"
            setValue={setForm}
            invalidForm={invalidForm}
            setInvalidForm={setInvalidForm}
          />
          <InputField
            value={form.password}
            nameKey="password"
            setValue={setForm}
            type="password"
            invalidForm={invalidForm}
            setInvalidForm={setInvalidForm}
          />
        </div>
      </div>
      <div></div>
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <span
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          onClick={() => setShowModal(true)}
        >
          Forgot Password?
        </span>
      </div>
      {!isRegister ? (
        <div className="  font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?
          <span
            className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => setIsRegister(true)}
          >
            Register
          </span>
        </div>
      ) : (
        <div className="  font-semibold text-sm text-slate-500 text-center md:text-left">
          Login now!!!
          <span
            className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => setIsRegister(false)}
          >
            Login
          </span>
        </div>
      )}
      <div className="mb-2">
        <Button onOk={handleSubmit}>{isRegister ? "Register" : "Login"}</Button>
      </div>
    </div>
  );
};

export default Login;
