const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controller/brandCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-brand", authMiddleware, adminMiddleware, createBrand);
router.put("/update-brand/:id", authMiddleware, adminMiddleware, updateBrand);
router.delete(
  "/delete-brand/:id",
  authMiddleware,
  adminMiddleware,
  deleteBrand
);
router.get("/brandID/:id", getBrand);
router.get("/all-brands", getAllBrand);
module.exports = router;
