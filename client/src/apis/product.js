import axios from "utils/axios";

export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "GET",
    params: params,
  });

export const apiGetProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "GET",
  });

export const apiRatings = (data) =>
  axios({
    url: "/product/ratings",
    method: "PUT",
    data,
  });
