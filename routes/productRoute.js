const express = require("express");
const {
  createProduct,
  getEachProduct,
  getAllProducts,
} = require("../controller/productCtrl");

const productRoute = require("../controller/productCtrl");
const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getEachProduct);
router.get("/getAll", productRoute.getAllProducts);
module.exports = router;
