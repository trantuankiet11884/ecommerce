const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/order.js");

router.post("/", verifyAT, ctrls.createNewOrder);
router.get("/", verifyAT, ctrls.getUserOrder);
router.get("/admin", [verifyAT, isAdmin], ctrls.getAllOrder);
router.put("/status/:oid", [verifyAT, isAdmin], ctrls.updateStatusOrder);

module.exports = router;
