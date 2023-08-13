const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/coupon.js");

router.post("/", [verifyAT, isAdmin], ctrls.createNewCoupon);
router.get("/", ctrls.getCoupons);
router.put("/:cid", [verifyAT, isAdmin], ctrls.updateCoupon);
router.delete("/:cid", [verifyAT, isAdmin], ctrls.deleteCoupon);

module.exports = router;
