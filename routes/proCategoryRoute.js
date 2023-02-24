const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controller/proCategoryCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-category",
  authMiddleware,
  adminMiddleware,
  createCategory
);
router.put(
  "/update-category/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory
);
router.delete(
  "/delete-category/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);
router.get("/categoryID/:id", getCategory);
router.get("/all-categories", getAllCategory);
module.exports = router;
