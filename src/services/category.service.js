import { pool } from "../db/connection.js";

export const detectCategory = async (userId, message, type) => {

  const text = message.toLowerCase();

  const [categories] = await pool.query(
    `SELECT id, name 
     FROM categories
     WHERE type = ?
     AND (user_id = ? OR user_id IS NULL)`,
    [type, userId]
  );

  for (const category of categories) {

    const categoryName = category.name.toLowerCase();

    if (text.includes(categoryName)) {
      return category.id;
    }

  }

  return null;
};