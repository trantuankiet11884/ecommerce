const userRouter = require("./user.js");
const productRouter = require("./product.js");
const productCategoryRouter = require("./productCategory.js");
const bloggoryRouter = require("./blogCategory.js");
const brandRouter = require("./brand.js");
const blog = require("./blog.js");
const order = require("./order.js");
const insert = require("./insert.js");
const { notFound, errorHandler } = require("../middlewares/errorHandler.js");
const coupon = require("./coupon.js");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use("/api/product", productRouter);

  app.use("/api/productCategory", productCategoryRouter);

  app.use("/api/blogCategory", bloggoryRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/blog", blog);
  app.use("/api/coupon", coupon);
  app.use("/api/order", order);
  app.use("/api/insert", insert);
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
