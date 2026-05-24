const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log("✅ Conectado ao Neon PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no Neon:", err);
  });

module.exports = pool;