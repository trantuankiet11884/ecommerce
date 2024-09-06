const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/order.js");

router.post("/", verifyAT, ctrls.createNewOrder);
router.put("/status/:oid", [verifyAT, isAdmin], ctrls.updateStatusOrder);
router.get("/admin", [verifyAT, isAdmin], ctrls.getOrders);
router.get("/", verifyAT, ctrls.getUserOrders);

module.exports = router;
