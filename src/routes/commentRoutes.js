const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const { verifyToken } = require("../middleware/verifyAccess");

// Rotas para os comentários
router.post("/", verifyToken, commentController.createComment);
router.get("/posts/:postId/comments", commentController.getCommentsByPost);
router.put("/:commentId", verifyToken, commentController.updateComment);
router.delete("/:commentId", verifyToken, commentController.deleteComment);

module.exports = router;
