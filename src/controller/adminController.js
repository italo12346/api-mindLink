const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");

async function createAdmin(req, res) {
  const { name, email, password } = req.body;

  try {
    // Gera um hash seguro da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo administrador com a senha criptografada
    const newAdmin = await Admin.create({
      name: name,
      email: email,
      password: hashedPassword, // Salva a senha criptografada no banco de dados
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar Administrador" });
  }
}
async function getAdmins(req, res) {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter Administradores" });
  }
}

async function getAdminById(req, res) {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrador não encontrado" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter Administrador" });
  }
}

async function updateAdmin(req, res) {
  const { id } = req.params;
  try {
    const [updated] = await Admin.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedAdmin = await Admin.findByPk(id);
      return res.status(200).json(updatedAdmin);
    }
    throw new Error("Moderador não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar moderador" });
  }
}

async function deleteAdmin(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Admin.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Administrador não encontrado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar Administrador" });
  }
}

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
