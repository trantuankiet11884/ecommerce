const Blog = require("../models/blog.js");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing values");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new blog !!!",
  });
});

const updateNewBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing values");

  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot update blog !!!",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    blogs: response ? response : "Cannot get blogs !!!",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing values");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.likes?.find((el) => el.toString() === id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isLiked = blog?.likes.find((el) => el.toString() === id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing values");
  const blog = await Blog.findById(bid);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isDisliked = blog?.dislikes?.find((el) => el.toString() === id);
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberReview: 1 } },
    { new: true }
  )
    .populate("likes", "firstName lastName")
    .populate("dislikes", "firstName lastName");
  return res.json({
    success: blog ? true : false,
    rs: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);

  return res.json({
    success: blog ? true : false,
    deletedBlog: blog || "Something wrongs !!!",
  });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Missing values");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { $push: { images: req.file } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedBlog: response ? response : "cannot upload images ",
  });
});

module.exports = {
  createNewBlog,
  updateNewBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getBlog,
  deleteBlog,
  uploadImageBlog,
};
