import { pool } from "../db/connection.js";

// buscar id de categoria por nombre
export const detectCategory = async (categoryName) => {

  const name = String(categoryName).toLowerCase();

  const [rows] = await pool.query(
    `SELECT id 
     FROM categories
     WHERE LOWER(name) = ?
     LIMIT 1`,
    [name]
  );

  // si existe la categoria devolver su id
  if (rows.length > 0) {
    return rows[0].id;
  }

  // si no existe usar categoria "otros"
  return 1;
};


// obtener categorias para darselas a la IA
export const getCategories = async (type) => {

  const [rows] = await pool.query(
    `SELECT id,name
     FROM categories
     WHERE type = ?`,
    [type]
  );

  return rows;
};