const express = require("express");
const { createCoupon } = require("../controller/couponCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-coupon", authMiddleware, adminMiddleware, createCoupon);
module.exports = router;
