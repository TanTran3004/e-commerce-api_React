const express = require("express");
const {
  createProduct,
  getEachProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  filterProducts,
} = require("../controller/productCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-product", authMiddleware, adminMiddleware, createProduct);
router.get("/productID/:id", getEachProduct);
router.get("/all-products", getAllProducts);
router.put(
  "/update-product/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);
router.get("/filter-product", filterProducts);

module.exports = router;
