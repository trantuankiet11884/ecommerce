const ctrls = require("../controllers/user.js");
const { verifyAT } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAT, ctrls.getCurrent);
router.post("/refreshToken", ctrls.refreshAT);
router.post("/logout", ctrls.logout);

module.exports = router;
