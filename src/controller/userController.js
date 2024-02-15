const User = require("../model/User");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Gera um hash seguro da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo psicólogos com a senha criptografada
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword, // Salva a senha criptografada no banco de dados
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar psicólogos" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter usuários" });
  }
}
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter Usuario" });
  }
}
async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      return res.status(200).json(updatedUser);
    }
    throw new Error("Usuario não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar Usuario" });
  }
}
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Usuario não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar Usuario" });
  }
}

async function uploadProfileImage(req, res) {
  const { id, role } = req.user;

  // Obter o caminho do arquivo do corpo da requisição usando req.file.path
  const filePath = req.file.path;

  if (!filePath) {
    return res.status(400).json({ message: "Nenhum arquivo foi enviado" });
  }

  try {
    const fileId = await uploadFile(role + " " + id, filePath); // Realiza o upload da imagem para o Google Drive e obtém o ID do arquivo
    const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`; // URL de visualização da imagem no Google Drive

    // Atualiza o campo profileImage no registro do administrador com o caminho da imagem
    const user = await User.findByPk(req.user.id);
    user.profileImage = imageUrl;
    await user.save();

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao fazer upload da imagem de perfil" });
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  uploadProfileImage,
};
