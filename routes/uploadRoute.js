const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post(
  "/update-product-img",
  authMiddleware,
  adminMiddleware,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete(
  "/delete-image/:id",
  authMiddleware,
  adminMiddleware,
  deleteImages
);

module.exports = router;
