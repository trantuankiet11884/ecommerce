const userRouter = require("./user.js");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
};

module.exports = initRoutes;
