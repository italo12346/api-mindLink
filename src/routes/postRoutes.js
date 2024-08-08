const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

// Rotas para os posts
router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
