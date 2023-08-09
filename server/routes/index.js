const userRouter = require("./user.js");
const { notFound, errorHandler } = require("../middlewares/errorHandler.js");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
