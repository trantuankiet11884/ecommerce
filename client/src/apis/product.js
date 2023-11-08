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

export const apiCreateProduct = (data) =>
  axios({
    url: "/product/",
    method: "post",
    data,
  });

export const apiUpdateProduct = (data, pid) =>
  axios({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiAddVarriants = (data, pid) =>
  axios({
    url: "/product/varriant/" + pid,
    method: "put",
    data,
  });
