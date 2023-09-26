import axios from "../utils/axios.js";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "GET",
    params: params,
  });
