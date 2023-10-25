const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAT = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        mes: "Invalid access token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication!!!",
    });
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (+role !== 1)
    return res.status(401).json({
      success: false,
      mes: "REQUIRE ADMIN ROLE",
    });
  next();
});

module.exports = {
  verifyAT,
  isAdmin,
};
