const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} = require("../controller/colorCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-color", authMiddleware, adminMiddleware, createColor);
router.put("/update-color/:id", authMiddleware, adminMiddleware, updateColor);
router.delete(
  "/delete-color/:id",
  authMiddleware,
  adminMiddleware,
  deleteColor
);
router.get("/colorID/:id", getColor);
router.get("/all-colors", getAllColor);
module.exports = router;
