const Psychologist = require("../model/Psychologist");
const bcrypt = require("bcrypt");

async function createPsychologist(req, res) {
  const { name, email, password } = req.body;

  try {
    // Gera um hash seguro da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo psicólogos com a senha criptografada
    const newPsychologist = await Psychologist.create({
      name: name,
      email: email,
      password: hashedPassword, // Salva a senha criptografada no banco de dados
    });

    res.status(201).json(newPsychologist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar psicólogos" });
  }
}

async function getPsychologists(req, res) {
  try {
    const psychologists = await Psychologist.findAll();
    res.status(200).json(psychologists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter psicólogos" });
  }
}

async function getPsychologistById(req, res) {
  const { id } = req.params;
  try {
    const psychologist = await Psychologist.findByPk(id);
    if (!psychologist) {
      return res.status(404).json({ message: "Psicólogo não encontrado" });
    }
    res.status(200).json(psychologist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter psicólogo" });
  }
}

async function updatePsychologist(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Psychologist.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedPsychologist = await Psychologist.findByPk(id);
      return res.status(200).json(updatedPsychologist);
    }
    throw new Error("Psicólogo não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar psicólogo" });
  }
}

async function deletePsychologist(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Psychologist.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Psicólogo não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar psicólogo" });
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
    const psychologist = await Psychologist.findByPk(req.user.id);
    psychologist.profileImage = imageUrl;
    await psychologist.save();

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao fazer upload da imagem de perfil" });
  }
}

module.exports = {
  createPsychologist,
  getPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
  uploadProfileImage,
};
