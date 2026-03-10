import { pool } from "../db/connection.js";
import { detectCategory } from "./category.service.js";

export const handleExpense = async (user_id, data) => {

  const { amount, category, description } = data;

  // buscar el id de la categoria
  const categoryId = await detectCategory(category);

  await pool.query(
    `INSERT INTO transactions
    (user_id, category_id, type, amount, description, date)
    VALUES (?, ?, 'expense', ?, ?, CURDATE())`,
    [user_id, categoryId, amount, description]
  );

  return {
    message: "Gasto registrado correctamente"
  };

};