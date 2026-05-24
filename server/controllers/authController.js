const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("ERRO REGISTER:", error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {

   console.log("bateu login");
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    console.error("ERRO LOGIN:", error);
    res.status(500).json({ error: error.message });
  }
};

async function changePassword(req, res) {

  try {

    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    // busca usuário no banco
    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    const user = userResult.rows[0];

    // verifica se usuário existe
    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado"
      });
    }

    // compara senha atual
    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Senha atual incorreta"
      });
    }

    // gera hash da nova senha
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // atualiza senha no banco
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, userId]
    );

    res.json({
      message: "Senha alterada com sucesso 🔐"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

module.exports = {
  register,
  login,
  changePassword
};