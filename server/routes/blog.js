const router = require("express").Router();
const { verifyAT, isAdmin } = require("../middlewares/verifyToken.js");
const ctrls = require("../controllers/blog.js");

router.get("/", ctrls.getBlogs);
router.post("/", [verifyAT, isAdmin], ctrls.createNewBlog);
router.get("/one/:bid", ctrls.getBlog);
router.put("/like/:bid", [verifyAT], ctrls.likeBlog);
router.put("/dislike/:bid", [verifyAT], ctrls.dislikeBlog);
router.put("/:bid", [verifyAT, isAdmin], ctrls.updateNewBlog);
router.delete("/:bid", [verifyAT, isAdmin], ctrls.deleteBlog);

module.exports = router;
