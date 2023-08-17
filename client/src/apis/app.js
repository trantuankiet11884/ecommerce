import axios from "../utils/axios.js";

export const apiGetCategories = () =>
  axios({
    url: "/productCategory/",
    method: "get",
  });
