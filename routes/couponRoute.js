const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-coupon", authMiddleware, adminMiddleware, createCoupon);
router.get("/all-coupons", authMiddleware, adminMiddleware, getAllCoupon);
router.put("/update-coupon/:id", authMiddleware, adminMiddleware, updateCoupon);
router.delete(
  "/delete-coupon/:id",
  authMiddleware,
  adminMiddleware,
  deleteCoupon
);

module.exports = router;
