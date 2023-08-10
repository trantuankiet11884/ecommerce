const { generateAT, generateRT } = require("../middlewares/jwt.js");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");

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
    const { password, role, refreshToken, ...userData } = response.toObject();

    const accessToken = generateAT(response._id, role);

    const newRefreshToken = generateRT(response._id);

    await User.findByIdAndUpdate(
      response._id,
      { newRefreshToken },
      { new: true }
    );

    res.cookie("rt", newRefreshToken, {
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
      success: user ? true : false,
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

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.query;
//   if (!email) throw new Error("Missing email");
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");
//   const resetToken = user.createPasswordChangedToken();
//   await user.save();

//   const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

//   const data = {
//     email: email,
//     html,
//   };

//   try {
//     const rs = await sendMail(data);
//     return res.status(200).json({
//       success: true,
//       rs,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error sending email",
//     });
//   }
// });

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email : ${response.email} deleted `
      : "No user deleted",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  //
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Some thing went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  //
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Some thing went wrong",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAT,
  logout,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
};
