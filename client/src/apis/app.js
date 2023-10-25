import axios from "utils/axios";

export const apiGetCategories = () =>
  axios({
    url: "/productCategory/",
    method: "get",
  });
