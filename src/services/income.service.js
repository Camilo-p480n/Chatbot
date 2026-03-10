import { pool } from "../db/connection.js";
import { detectCategory } from "./category.service.js";

export const handleIncome = async (user_id, data) => {

  const { amount, category, description } = data;

  const categoryId = await detectCategory(category);

  await pool.query(
    `INSERT INTO transactions
    (user_id, category_id, type, amount, description, date)
    VALUES (?, ?, 'income', ?, ?, CURDATE())`,
    [user_id, categoryId, amount, description]
  );

  return {
    message: "Ingreso registrado correctamente"
  };

};