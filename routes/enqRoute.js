const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry,
} = require("../controller/enqCtrl");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-enquiry", authMiddleware, adminMiddleware, createEnquiry);
router.put(
  "/update-enquiry/:id",
  authMiddleware,
  adminMiddleware,
  updateEnquiry
);
router.delete(
  "/delete-enquiry/:id",
  authMiddleware,
  adminMiddleware,
  deleteEnquiry
);
router.get("/enquiryID/:id", getEnquiry);
router.get("/all-enquiries", getAllEnquiry);
module.exports = router;
