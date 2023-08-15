const Order = require("../models/order.js");
const User = require("../models/user.js");

const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const userCart = await User.findById(id).select("cart");
  return res.json({
    success: userCart ? true : false,
    createdOrder: userCart ? userCart : "Cannot create order",
  });
});

module.exports = {
  createNewOrder,
};
