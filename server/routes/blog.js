const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/blog.js");

router.get("/", ctrls.getBlogs);
router.post("/", [verifyAT, isAdmin], ctrls.createNewBlog);
router.put("/like", [verifyAT], ctrls.likeBlog);
router.put("/:bid", [verifyAT, isAdmin], ctrls.updateNewBlog);

module.exports = router;
