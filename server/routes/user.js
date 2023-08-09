const ctrls = require("../controllers/user.js");

const router = require("express").Router();

router.post("/register", ctrls.register);

module.exports = router;
