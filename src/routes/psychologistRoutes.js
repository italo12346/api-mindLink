const express = require("express");
const router = express.Router();
const psychologistController = require("../controller/psychologistController");
const { verifyToken,verifyPermissions} = require("../middleware/verifyAccess");

router.post("/", verifyToken,verifyPermissions, psychologistController.createPsychologist);
router.get("/", psychologistController.getPsychologists);
router.get("/:id", psychologistController.getPsychologistById);
router.put("/:id", verifyToken, psychologistController.updatePsychologist);
router.delete("/:id",verifyToken, psychologistController.deletePsychologist);

module.exports = router;
