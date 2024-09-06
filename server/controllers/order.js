const Order = require("../models/order.js");
const User = require("../models/user.js");
const Coupon = require("../models/coupon.js");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(id, { address, cart: [] });
  }
  const data = { products, total, orderBy: id, status };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    message: rs ? rs : "Something went wrongs...",
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

const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { id } = req.user;
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObj = {};

  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = {
  //     $regex: queries.category,
  //     $options: "i",
  //   };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObj = { $or: colorQuery };
  // }

  // let queryObj = {};

  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObj = {
  //     $or: [
  //       {
  //         color: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         title: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         category: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         brand: { $regex: queries.q, $options: "i" },
  //       },
  //     ],
  //   };
  // }

  const qr = { ...formatedQueries, orderBy: id };

  let queryCommand = Order.find(qr);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  queryCommand.then((response) => {
    return Order.find(qr)
      .countDocuments()
      .then((counts) => {
        return res.status(200).json({
          success: response ? true : false,
          counts,
          orders: response ? response : "Cannot get products !!!",
        });
      })
      .catch((countsError) => {
        throw new Error(countsError.message);
      });
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObj = {};

  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = {
  //     $regex: queries.category,
  //     $options: "i",
  //   };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObj = { $or: colorQuery };
  // }

  // let queryObj = {};

  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObj = {
  //     $or: [
  //       {
  //         color: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         title: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         category: { $regex: queries.q, $options: "i" },
  //       },
  //       {
  //         brand: { $regex: queries.q, $options: "i" },
  //       },
  //     ],
  //   };
  // }

  const qr = { ...formatedQueries };

  let queryCommand = Order.find(qr);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  queryCommand.then((response) => {
    return Order.find(qr)
      .countDocuments()
      .then((counts) => {
        return res.status(200).json({
          success: response ? true : false,
          counts,
          orders: response ? response : "Cannot get products !!!",
        });
      })
      .catch((countsError) => {
        throw new Error(countsError.message);
      });
  });
});

module.exports = {
  createNewOrder,
  updateStatusOrder,
  getUserOrders,
  getOrders,
};
