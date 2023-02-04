const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getEachUser,
  deleteEachUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
} = require("../controller/userCtrl");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.put("/change", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/allUsers", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, adminMiddleware, getEachUser);
router.delete("/:id", deleteEachUser);
router.put("/editUser", authMiddleware, updateUser);
router.put("/blockUser/:id", authMiddleware, adminMiddleware, blockUser);
router.put("/unblockUser/:id", authMiddleware, adminMiddleware, unBlockUser);
module.exports = router;
