const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICES: "service",
  FAQ: "faqs",
  DETAILS_PRODUCT_CATEGORY_PID_TITLE: `:category/:pid/:title`,
  FINAL_REGISTER: `finalRegister/:status`,
  RESET_PASSWORD: `reset-password/:token`,
  DETAIL_CART: "my-cart",

  ADMIN: "admin",
  DASHBOARD: "statistic",
  MANAGE_USERS: "manage-users",
  MANAGE_ORDER: "manage-order",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_PRODUCTS: "create-products",

  MEMBER: "member",
  PERSONAL: "personal",
  CART: "cart",
  WISHLIST: "wishlist",
  HISTORY_ORDER: "history-order",
};

export default path;
