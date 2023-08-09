const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({
      sucess: false,
      mes: "Missing values",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Email has existed!");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser ? "Register is successfully" : "Something wrongs....",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      mes: "Missing values",
    });

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    return res.status(200).json({
      sucess: true,
      userData,
    });
  } else {
    throw new Error("Invalid credentials!!!");
  }
});

module.exports = {
  register,
  login,
};
