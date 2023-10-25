const { generateAT, generateRT } = require("../middlewares/jwt.js");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const makeToken = require("uniqid");
const crypto = require("crypto");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   if (!email || !password || !firstName || !lastName)
//     return res.status(400).json({
//       success: false,
//       message: "Missing values",
//     });

//   const user = await User.findOne({ email });
//   if (user) throw new Error("Email has existed!");
//   else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       message: newUser ? "Register is successfully" : "Something wrongs...",
//     });
//   }
// });

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;
  if (!email || !password || !firstName || !lastName || !mobile)
    return res.status(400).json({
      success: false,
      message: "Missing values",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Email has existed!");
  else {
    const token = makeToken();
    const emailedited = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: emailedited,
      password,
      firstName,
      lastName,
      mobile,
    });
    if (newUser) {
      const html = ` <h2>Register code :</h2> </br><blockquote>${token}</blockquote>`;
      await sendMail(email, html, "Confirm Register Account");
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailedited });
    }, [200000]);
    return res.json({
      success: newUser ? true : false,
      message: newUser
        ? "Check your email to account, pls !!!"
        : "Something went wrongs ...",
    });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  const notActivedEmail = await User.findOne({
    email: new RegExp(`${token}$`),
  });
  if (notActivedEmail) {
    notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
    notActivedEmail.save();
  }

  return res.json({
    success: notActivedEmail ? true : false,
    message: notActivedEmail
      ? "Register is successfully, pls login !!!"
      : "Something went wrongs ...",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing values",
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
  // const { _id } = req.user;
  // const user = await User.findById(_id).select("-refreshToken -password");

  // return res.status(200).json({
  //   success: user ? true : false,
  //   rs: user ? user : "User not found",
  // });

  if (!req.user || !req.user.id) {
    return res.status(400).json({
      success: false,
      message: "User ID (id) not provided",
    });
  }

  try {
    const user = await User.findById(req.user.id).select(
      "-refreshToken -password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: user ? true : false,
      rs: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
      .json({ success: false, messagesage: "No refresh token in cookies" });
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
      .json({ success: false, messagesage: "Invalid refresh token" });
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
    message: "Logout is done",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!email) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào đường dẫn dưới đây để thay đổi mật khẩu của bạn. Đường dẫn này sẽ hết hiệu lực sau 15 phút.
  <a href=${process.env.CLIENT}/reset-password/${resetToken}>Click Here</a>
  `;

  const rs = await sendMail(email, html, "Forgot Password");
  return res.status(200).json({
    success: true,
    message: rs.response?.includes("OK")
      ? "Hãy check mail của bạn !!!"
      : "Đã có lỗi, hãy thử lại sau !!!",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missings values");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Update password" : "Something went wrongs ...",
  });
});

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

const updateUserAddress = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const response = await User.findByIdAndUpdate(
      id,
      { $push: { address: req.body.address } },
      {
        new: true,
      }
    ).select("-password -role -refreshToken");

    if (!response) {
      return res.status(404).json({
        success: false,
        messagesage: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedUser: response,
    });
  } catch (error) {
    console.error("Error updating user address:", error);
    return res.status(500).json({
      success: false,
      messagesage: "Error updating user address: " + error.messagesage,
    });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  //
  const { id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing inputs");
  const user = await User.findById(id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Some thing went wrong",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Some thing went wrong",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Some thing went wrong",
    });
  }
});

module.exports = {
  register,
  finalRegister,
  login,
  getCurrent,
  refreshAT,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
};
