const Post = require("../model/Post");
const Comments = require("../model/Comment");

// Controlador para criar um novo post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Obtém o ID do usuário do objeto req.user

  try {
    const post = await Post.create({ title, content, userId }); // Usa o ID do usuário para criar o post associado a ele
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para listar todos os posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: Comments });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controlador para atualizar um post existente
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.id;
    const userRole = req.user.role; // Supondo que o papel do usuário seja armazenado em req.user.role

    // Verifica se o usuário é um moderador ou administrador
    if (userRole !== "moderator" && userRole !== "admin") {
      // Se não for moderador ou administrador, verifica se o usuário é o autor do post
      if (post.userId !== userId) {
        return res.status(403).json({
          error: "Forbidden: You are not allowed to update this post",
        });
      }
    }

    await post.update({ title, content });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controlador para excluir um post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.id;
    const userRole = req.user.role; // Supondo que o papel do usuário seja armazenado em req.user.role

    // Verifica se o usuário é um moderador ou administrador
    if (userRole !== "moderator" && userRole !== "admin") {
      // Se não for moderador ou administrador, verifica se o usuário é o autor do post
      if (post.userId !== userId) {
        return res.status(403).json({
          error: "Forbidden: You are not allowed to delete this post",
        });
      }
    }

    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
