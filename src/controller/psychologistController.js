const Psychologist = require("../model/Psychologist");

async function createPsychologist(req, res) {
  try {
    const newPsychologist = await Psychologist.create(req.body);
    res.status(201).json(newPsychologist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar psicólogo" });
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

module.exports = {
  createPsychologist,
  getPsychologists,
  getPsychologistById,
  updatePsychologist,
  deletePsychologist,
};
