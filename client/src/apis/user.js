import axios from "utils/axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalRegister/" + token,
    method: "put",
  });

export const apiLogin = (data) => {
  return axios({
    url: "/user/login",
    method: "post",
    data,
  });
};

export const apiForgotPassword = (data) => {
  return axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });
};

export const apiResetPassword = (data) => {
  return axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
};

export const apiGetCurrent = () => {
  return axios({
    url: "/user/current",
    method: "get",
  });
};
