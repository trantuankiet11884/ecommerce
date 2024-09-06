import axios from "utils/axios";

export const apiCreateOrder = (data) =>
  axios({
    url: "/order/",
    method: "post",
    data,
  });

export const apiGetOrders = (params) =>
  axios({
    url: "/order/admin",
    method: "get",
  });

export const apiGetUserOrder = (params) =>
  axios({
    url: "/order/",
    method: "get",
  });
