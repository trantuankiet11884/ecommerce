const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({
      sucess: false,
      mes: "Missing values",
    });
  const response = await User.create(req.body);
  return res.status(200).json({
    sucess: response ? true : false,
  });
});

module.exports = {
  register,
};
