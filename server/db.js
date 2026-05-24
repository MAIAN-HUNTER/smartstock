const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "smartstock",
  password: "minhamoto",
  port: 5432,
});

module.exports = pool;