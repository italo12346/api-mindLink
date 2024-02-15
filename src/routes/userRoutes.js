const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken,verifyPermissions} = require("../middleware/verifyAccess");
const { upload } = require("../middleware/uploadImage");

router.post("/", userController.createUser);
router.get("/", verifyToken, verifyPermissions, userController.getUsers);
router.get("/:id", verifyToken,verifyPermissions, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.post(
    "/upload",
    verifyToken,
    upload.single("image"),
    userController.uploadProfileImage
  );

module.exports = router;
