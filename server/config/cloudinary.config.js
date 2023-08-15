const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dmzfqcw3s",
  api_key: "468934992892697",
  api_secret: "TB2XaPMB0oHH1hg_JycrpdR1KQ0",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpeg", "png", "jpg"],
  params: {
    folder: "ecommerce",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
