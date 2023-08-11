const ctrls = require("../controllers/product.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/", [verifyAT, isAdmin], ctrls.createProduct);
router.get("/", ctrls.getProducts);
router.put("/ratings", verifyAT, ctrls.ratings);

router.put("/:pid", [verifyAT, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAT, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);
module.exports = router;
