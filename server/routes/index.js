const userRouter = require("./user.js");
const productRouter = require("./product.js");
const { notFound, errorHandler } = require("../middlewares/errorHandler.js");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use("/api/product", productRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
