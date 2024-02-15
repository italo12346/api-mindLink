const Moderator = require("../model/Moderator");
const bcrypt = require("bcrypt");

async function createModerator(req, res) {
  const { name, email, password } = req.body;

  try {
    // Gera um hash seguro da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo administrador com a senha criptografada
    const newModerator = await Moderator.create({
      name: name,
      email: email,
      password: hashedPassword, // Salva a senha criptografada no banco de dados
    });

    res.status(201).json(newModerator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar Moderador" });
  }
}

async function getModerators(req, res) {
  try {
    const moderators = await Moderator.findAll();
    res.status(200).json(moderators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter moderadores" });
  }
}

async function getModeratorById(req, res) {
  const { id } = req.params;
  try {
    const moderator = await Moderator.findByPk(id);
    if (!moderator) {
      return res.status(404).json({ message: "Moderador não encontrado" });
    }
    res.status(200).json(moderator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter moderador" });
  }
}

async function updateModerator(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Moderator.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedModerator = await Moderator.findByPk(id);
      return res.status(200).json(updatedModerator);
    }
    throw new Error("Moderador não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar moderador" });
  }
}

async function deleteModerator(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Moderator.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Moderador não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar moderador" });
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
    const moderador = await Moderador.findByPk(req.user.id);
    moderador.profileImage = imageUrl;
    await moderador.save();

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao fazer upload da imagem de perfil" });
  }
}

module.exports = {
  createModerator,
  getModerators,
  getModeratorById,
  updateModerator,
  deleteModerator,
  uploadProfileImage,
};
