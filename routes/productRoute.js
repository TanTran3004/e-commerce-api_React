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

router.post("/createProduct", authMiddleware, adminMiddleware, createProduct);
router.get("/productID/:id", getEachProduct);
router.get("/getAll", getAllProducts);
router.put(
  "/updateProduct/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);
router.delete(
  "/deleteProduct/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);
router.get("/filterProduct", filterProducts);

module.exports = router;
