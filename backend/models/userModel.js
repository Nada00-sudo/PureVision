const { Pool } = require('pg');

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "testdb"
});

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (nom, email, hashedPassword, role) => {
  const result = await pool.query(
    'INSERT INTO users (nom, email, mot_de_passe, role) VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role',
    [nom, email, hashedPassword, role]
  );
  return result.rows[0];
};

const updateUserProfile = async (id, nom, email) => {
  const result = await pool.query(
    'UPDATE users SET nom = $1, email = $2 WHERE id = $3 RETURNING id, nom, email, role',
    [nom, email, id]
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserProfile
};