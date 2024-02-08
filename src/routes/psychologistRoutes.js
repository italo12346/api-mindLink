const express = require("express");
const router = express.Router();
const psychologistController = require("../controller/psychologistController");

router.post("/", psychologistController.createPsychologist);
router.get("/", psychologistController.getPsychologists);
router.get("/:id", psychologistController.getPsychologistById);
router.put("/:id", psychologistController.updatePsychologist);
router.delete("/:id", psychologistController.deletePsychologist);

module.exports = router;
