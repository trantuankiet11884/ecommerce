const ctrls = require("../controllers/brand.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/", [verifyAT, isAdmin], ctrls.createNewBrand);
router.get("/", ctrls.getBrands);
router.put("/:bid", [verifyAT, isAdmin], ctrls.updateBrand);
router.delete("/:bid", [verifyAT, isAdmin], ctrls.deleteBrand);

module.exports = router;
