const Order = require("../models/order.js");
const User = require("../models/user.js");
const Coupon = require("../models/coupon.js");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  let total = userCart?.cart?.reduce((sum, el) => {
    return el.product.price * el.quantity + sum;
  }, 0);
  let createData = { products, total, orderBy: id };

  if (coupon) {
    let selectedCoupon = await Coupon.findById(coupon);
    total =
      Math.round(total + (1 - +selectedCoupon.discount / 100) / 1000) * 1000 ||
      total;
    createData.total = total;
    createData.coupon = coupon;
  }

  const rs = await Order.create(createData);
  return res.json({
    success: rs ? true : false,
    userCart,
    createdOrder: rs ? rs : "Something went wrongs...",
  });
});

const updateStatusOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing values");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrongs...",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const response = await Order.find({ orderBy: id });
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrongs...",
  });
});

const getAllOrder = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrongs...",
  });
});

module.exports = {
  createNewOrder,
  updateStatusOrder,
  getUserOrder,
  getAllOrder,
};
