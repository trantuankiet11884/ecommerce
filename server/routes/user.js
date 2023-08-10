const ctrls = require("../controllers/user.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAT, ctrls.getCurrent);
router.post("/refreshToken", ctrls.refreshAT);
router.post("/logout", ctrls.logout);
router.get("/", [verifyAT, isAdmin], ctrls.getUsers);
router.delete("/", [verifyAT, isAdmin], ctrls.deleteUser);
router.put("/current", [verifyAT], ctrls.updateUser);
router.put("/:uid", [verifyAT, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;
