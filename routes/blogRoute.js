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
  uploadImages,
} = require("../controller/blogCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages");

// router.post("/create", createBlog);
router.post("/create", authMiddleware, adminMiddleware, createBlog);
router.put("/update/:id", authMiddleware, adminMiddleware, updateBlog);
router.put(
  "/update-blog-img/:id",
  authMiddleware,
  adminMiddleware,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);

router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBlog);
router.get("/blogId/:id", getEachBlog);
router.get("/all-blogs", getAllBlog);
router.put("/likes", authMiddleware, adminMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, adminMiddleware, dislikeBlog);

module.exports = router;
