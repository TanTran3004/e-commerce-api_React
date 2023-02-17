const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodb");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const findCoupon = await Coupon.find();
    res.json(findCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const deletedCoupon = await Coupon.findByIdAndRemove(id);
    res.json(deletedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon };
