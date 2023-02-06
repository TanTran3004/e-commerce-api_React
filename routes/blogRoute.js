const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getEachBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require("../controller/blogCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

// router.post("/create", createBlog);
router.post("/create", authMiddleware, adminMiddleware, createBlog);
router.put("/update/:id", authMiddleware, adminMiddleware, updateBlog);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBlog);
router.get("/blogId/:id", getEachBlog);
router.get("/all-blogs", getAllBlog);
router.put("/likes", authMiddleware, adminMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, adminMiddleware, dislikeBlog);

module.exports = router;
