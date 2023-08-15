const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/order.js");

router.post("/", verifyAT, ctrls.createNewOrder);

module.exports = router;
