const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const { verifyToken } = require("../middleware/verifyAccess");

// Rota para obter todos os dados do usuário logado
router.get("/", verifyToken, profileController.getUserData);

module.exports = router;
