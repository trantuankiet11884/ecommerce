const userRouter = require("./user.js");
const productRouter = require("./product.js");
const productCategoryRouter = require("./productCategory.js");
const bloggoryRouter = require("./blogCategory.js");
const blog = require("./blog.js");
const { notFound, errorHandler } = require("../middlewares/errorHandler.js");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use("/api/product", productRouter);

  app.use("/api/productCategory", productCategoryRouter);

  app.use("/api/blogCategory", bloggoryRouter);
  app.use("/api/blog", blog);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
