const ctrls = require("../controllers/user.js");

const router = require("express").Router();

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);

module.exports = router;
