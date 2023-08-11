const ctrls = require("../controllers/productCategory.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/", [verifyAT, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.put("/:pcid", [verifyAT, isAdmin], ctrls.updateCategory);
router.delete("/:pcid", [verifyAT, isAdmin], ctrls.deleteCategory);

module.exports = router;
