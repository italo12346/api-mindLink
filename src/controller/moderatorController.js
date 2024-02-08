const Moderator = require("../model/Moderator");

async function createModerator(req, res) {
  try {
    const newModerator = await Moderator.create(req.body);
    res.status(201).json(newModerator);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar moderador" });
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

module.exports = {
  createModerator,
  getModerators,
  getModeratorById,
  updateModerator,
  deleteModerator,
};
