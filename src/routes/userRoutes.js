const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken,verifyPermissions} = require("../middleware/verifyAccess");

router.post("/", userController.createUser);
router.get("/", verifyToken, verifyPermissions, userController.getUsers);
router.get("/:id", verifyToken,verifyPermissions, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

module.exports = router;
