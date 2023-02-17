const express = require("express");
const {
  createProduct,
  getEachProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  filterProducts,
  addWishlist,
  ratingProduct,
  uploadImages,
} = require("../controller/productCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/create-product", authMiddleware, adminMiddleware, createProduct);
router.get("/productID/:id", getEachProduct);
router.get("/all-products", getAllProducts);
router.put("/wishlist", authMiddleware, addWishlist);

router.put("/rating", authMiddleware, ratingProduct);
router.put(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.put(
  "/update-product-img/:id",
  authMiddleware,
  adminMiddleware,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);
router.get("/filter-product", filterProducts);

module.exports = router;
