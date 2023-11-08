const ctrls = require("../controllers/product.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();
const uploader = require("../config/cloudinary.config.js");
router.post(
  "/",
  [verifyAT, isAdmin],
  uploader.fields([
    {
      name: "images",
      maxCount: 10,
    },
    { name: "thumbnail", maxCount: 1 },
  ]),
  ctrls.createProduct
);
router.get("/", ctrls.getProducts);
router.put("/ratings", verifyAT, ctrls.ratings);

router.put(
  "/uploadimage/:pid",
  [verifyAT, isAdmin],
  uploader.array("images", 10),
  ctrls.uploadImagesProduct
);
router.put(
  "/varriant/:pid",
  [verifyAT, isAdmin],
  uploader.fields([
    {
      name: "images",
      maxCount: 10,
    },
    { name: "thumbnail", maxCount: 1 },
  ]),

  ctrls.addVarriants
);
router.put(
  "/:pid",
  [verifyAT, isAdmin],
  uploader.fields([
    {
      name: "images",
      maxCount: 10,
    },
    { name: "thumbnail", maxCount: 1 },
  ]),

  ctrls.updateProduct
);
router.delete("/:pid", [verifyAT, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);
module.exports = router;
