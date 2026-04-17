import db from '../config/db.js';

export const createUser = async (nom, email, hashedPassword, role = 'user') => {
  const query = `
    INSERT INTO users (nom, email, mot_de_passe, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nom, email, role, created_at;
  `;
  const values = [nom, email, hashedPassword, role];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const query = `SELECT id, nom, email, role, created_at FROM users WHERE id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

export const updateUserProfile = async (id, nom, email) => {
  const query = `
    UPDATE users 
    SET nom = $1, email = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING id, nom, email, role, updated_at;
  `;
  const { rows } = await db.query(query, [nom, email, id]);
  return rows[0];
};
