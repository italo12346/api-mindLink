const Post = require("../model/Post");
const Comments = require("../model/Comment");
// Controlador para criar um novo comentário
exports.createComment = async (req, res) => {
  try {
    const { title, body, PostId } = req.body;
    const comment = await Comments.create({ title, body, PostId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controlador para listar todos os comentários de um post específico
exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controlador para atualizar um comentário existente
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { title, body } = req.body;
    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const userId = req.user.id;
    const userRole = req.user.role; // Supondo que o papel do usuário seja armazenado em req.user.role

    // Verifica se o usuário é um moderador ou administrador
    if (userRole !== "moderator" && userRole !== "admin") {
      // Se não for moderador ou administrador, verifica se o usuário é o autor do comentário
      if (comment.userId !== userId) {
        return res.status(403).json({
          error: "Forbidden: You are not allowed to update this comment",
        });
      }
    }

    await comment.update({ title, body });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controlador para excluir um comentário
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const userId = req.user.id;
    const userRole = req.user.role; // Supondo que o papel do usuário seja armazenado em req.user.role

    // Verifica se o usuário é um moderador ou administrador
    if (userRole !== "moderator" && userRole !== "admin") {
      // Se não for moderador ou administrador, verifica se o usuário é o autor do comentário
      if (comment.userId !== userId) {
        return res.status(403).json({
          error: "Forbidden: You are not allowed to delete this comment",
        });
      }
    }

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
