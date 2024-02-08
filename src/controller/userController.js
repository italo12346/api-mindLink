const User = require("../model/User");

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
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
module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
};
