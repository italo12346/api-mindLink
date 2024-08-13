const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const {
  verifyToken,
  verifyAdminOrModerator,
} = require("../middleware/verifyAccess");

// Rota para criar um novo post (requere autenticação)
router.post("/", verifyToken, postController.createPost);

// Rota para listar todos os posts (público)
router.get("/", postController.getAllPosts);

// Rota para atualizar um post (requere autenticação e permissões)
router.put("/:postId", verifyToken, postController.updatePost);

// Rota para excluir um post (requere autenticação e permissões)
router.delete("/:postId", verifyToken, postController.deletePost);

module.exports = router;
