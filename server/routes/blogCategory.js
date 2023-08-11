const ctrls = require("../controllers/blogCategory.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/", [verifyAT, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.put("/:bcid", [verifyAT, isAdmin], ctrls.updateCategory);
router.delete("/:bcid", [verifyAT, isAdmin], ctrls.deleteCategory);

module.exports = router;
