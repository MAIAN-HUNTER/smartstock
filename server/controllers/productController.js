const pool = require("../db");

const getProducts = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT * FROM products
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: "Erro ao buscar produtos"
    });
  }
};

const createProduct = async (req, res) => {

  const { name, quantity, price } = req.body;

  const userId = req.user.id;

  try {

    const result = await pool.query(
      `
      INSERT INTO products
      (name, quantity, price, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, quantity, price, userId]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: "Erro ao criar produto"
    });
  }
};

const updateProduct = async (req, res) => {

  const { id } = req.params;

  const { name, quantity, price } = req.body;

  const userId = req.user.id;

  try {

    const result = await pool.query(
      `
      UPDATE products
      SET
        name = $1,
        quantity = $2,
        price = $3
      WHERE id = $4
      AND user_id = $5
      RETURNING *
      `,
      [name, quantity, price, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    res.status(200).json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: "Erro ao atualizar produto"
    });
  }
};

const deleteProduct = async (req, res) => {

  const { id } = req.params;

  const userId = req.user.id;

  try {

    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id = $1
      AND user_id = $2
      RETURNING *
      `,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado"
      });
    }

    res.status(200).json({
      message: "Produto removido com sucesso"
    });

  } catch (err) {

    res.status(500).json({
      error: "Erro ao deletar produto"
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};