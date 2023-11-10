const ctrls = require("../controllers/user.js");
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const router = require("express").Router();
const uploader = require("../config/cloudinary.config.js");

router.post("/register", ctrls.register);
router.put("/finalRegister/:token", ctrls.finalRegister);
router.post("/login", ctrls.login);
router.get("/current", verifyAT, ctrls.getCurrent);
router.post("/refreshToken", ctrls.refreshAT);
router.post("/logout", ctrls.logout);
router.post("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAT, isAdmin], ctrls.getUsers);
router.delete("/:uid", [verifyAT, isAdmin], ctrls.deleteUser);
router.put("/current", [verifyAT], uploader.single("avatar"), ctrls.updateUser);
router.put("/address", [verifyAT], ctrls.updateUserAddress);
router.put("/cart", [verifyAT], ctrls.updateCart);
router.delete("/remove-cart/:pid/:color", [verifyAT], ctrls.removeCart);
router.put("/:uid", [verifyAT, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;
