const { response, query } = require("express");
const Product = require("../models/product.js");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const makeSKU = require("uniqid");

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color } = req.body;

  const thumbnail = req?.files?.thumbnail[0]?.path;
  const images = req.files?.images?.map((el) => el.path);

  if (!(title && price && description && brand && category && color))
    throw new Error("Missing inputs");
  req.body.slug = slugify(title);
  if (thumbnail) req.body.thumbnail = thumbnail;
  if (images) req.body.images = images;
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct
      ? "Created Product Successly"
      : "Cannot create new product !!!",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({
    path: "ratings",
    populate: { path: "postedBy", select: "firstName lastName avatar" },
  });
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product !!!",
  });
});

const getProducts = asyncHandler(async (req, res) => {
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

  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = {
      $regex: queries.category,
      $options: "i",
    };
  if (queries?.brand)
    formatedQueries.brand = {
      $regex: queries.brand,
      $options: "i",
    };
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    colorQueryObj = { $or: colorQuery };
  }

  let queryObj = {};

  if (queries?.q) {
    delete formatedQueries.q;
    queryObj = {
      $or: [
        {
          color: { $regex: queries.q, $options: "i" },
        },
        {
          title: { $regex: queries.q, $options: "i" },
        },
        {
          category: { $regex: queries.q, $options: "i" },
        },
        {
          brand: { $regex: queries.q, $options: "i" },
        },
      ],
    };
  }
  const qr = { ...colorQueryObj, ...formatedQueries, ...queryObj };

  let queryCommand = Product.find(qr);

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
    return Product.find(qr)
      .countDocuments()
      .then((counts) => {
        return res.status(200).json({
          success: response ? true : false,
          counts,
          products: response ? response : "Cannot get products !!!",
        });
      })
      .catch((countsError) => {
        throw new Error(countsError.message);
      });
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  if (files?.thumbnail) req.body.thumbnail = files?.thumbnail[0]?.path;

  if (files?.images) req.body.images = files?.images?.map((el) => el.path);

  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct
      ? "Updated Successly !!!"
      : "Cannot  update product !!!",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    message: deletedProduct
      ? "Deleted Successly !!!"
      : "Cannot delete product !!!",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;

  if (!star || !pid) throw new Error("Missing input !!!");

  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy === id
  );

  if (alreadyRating) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: id, updatedAt } },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();
  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing values");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: req.files },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "Cannot upload images !!!",
  });
});

const addVarriants = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, price, color } = req.body;

  const thumbnail = req?.files?.thumbnail[0]?.path;
  const images = req.files?.images?.map((el) => el.path);

  if (!(title && price && color)) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: {
        varriants: {
          color,
          price,
          title,
          thumbnail,
          images,
          SKU: makeSKU().toUpperCase(),
        },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? "Add Varriants successly"
      : "Something went wrongs... !!!",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
  addVarriants,
};
