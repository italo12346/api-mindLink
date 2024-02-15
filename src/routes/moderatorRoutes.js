const express = require("express");
const router = express.Router();
const moderatorController = require("../controller/moderatorController");
const {
  verifyToken,
  verifyPermissions,
} = require("../middleware/verifyAccess");
const { upload } = require("../middleware/uploadImage");

router.post(
  "/",
  verifyToken,
  verifyPermissions,
  moderatorController.createModerator
);
router.get(
  "/",
  verifyToken,
  verifyPermissions,
  moderatorController.getModerators
);
router.get(
  "/:id",
  verifyToken,
  verifyPermissions,
  moderatorController.getModeratorById
);
router.put(
  "/:id",
  verifyToken,
  verifyPermissions,
  moderatorController.updateModerator
);
router.delete(
  "/:id",
  verifyToken,
  verifyPermissions,
  moderatorController.deleteModerator
);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  moderatorController.uploadProfileImage
);

module.exports = router;
