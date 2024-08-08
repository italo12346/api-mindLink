const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { verifyToken } = require("../middleware/verifyAccess");
const { upload } = require("../middleware/uploadImage");

router.post("/", adminController.createAdmin);
router.get("/", verifyToken, adminController.getAdmins);
router.get("/:id", verifyToken, adminController.getAdminById);
router.put("/:id", verifyToken, adminController.updateAdmin);
router.delete("/:id", verifyToken, adminController.deleteAdmin);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  adminController.uploadProfileImage
);

module.exports = router;
