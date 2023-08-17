import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.data;
  }
);

export default instance;
