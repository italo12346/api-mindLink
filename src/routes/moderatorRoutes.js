const express = require("express");
const router = express.Router();
const moderatorController = require("../controller/moderatorController");

router.post("/", moderatorController.createModerator);
router.get("/", moderatorController.getModerators);
router.get("/:id", moderatorController.getModeratorById);
router.put("/:id", moderatorController.updateModerator);
router.delete("/:id", moderatorController.deleteModerator);

module.exports = router;
