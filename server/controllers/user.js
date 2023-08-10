const { generateAT, generateRT } = require("../middlewares/jwt.js");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({
      success: false,
      mes: "Missing values",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Email has existed!");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? "Register is successfully" : "Something wrongs...",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing values",
    });

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAT(response._id, role);
    const refreshToken = generateRT(response._id);
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      userData,
      accessToken,
    });
  } else {
    throw new Error("Invalid credentials!!!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  // Check if req.user.id exists
  if (!req.user || !req.user.id) {
    return res.status(400).json({
      success: false,
      mes: "User ID (id) not provided",
    });
  }

  try {
    const user = await User.findById(req.user.id).select(
      "-refreshToken -password -role"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        mes: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      userData: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      mes: "Internal server error",
    });
  }
});

const refreshAT = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;

  console.log("Cookies received:", cookie);

  // Check xem có token hay không
  if (!cookie || !cookie.rt) {
    console.log("No refresh token in cookies");
    return res
      .status(400)
      .json({ success: false, message: "No refresh token in cookies" });
  }

  try {
    const rs = await jwt.verify(cookie.rt, process.env.JWT_SECRET);

    const response = await User.findOne({
      _id: rs.id, // Sử dụng "id" thay vì "_id" nếu đúng với cấu trúc token
      refreshToken: cookie.rt,
    });

    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response
        ? generateAT(response._id, response.role)
        : "Refresh token not matched",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid refresh token" });
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAT,
  logout,
};
