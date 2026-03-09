import { pool } from "../db/connection.js";
import { detectCategory } from "./category.service.js";

export const handleIncome = async (userId, data) => {

  const { amount, description } = data;

  if (!amount) {
    return { message: "No pude detectar el monto del ingreso" };
  }

  const categoryId = await detectCategory(userId, description, "income");

  await pool.query(
    `INSERT INTO transactions
    (user_id, category_id, type, amount, description, date)
    VALUES (?, ?, 'income', ?, ?, CURDATE())`,
    [userId, categoryId || 7, amount, description]
  );

  return {
    message: `Ingreso registrado: ${amount}`
  };

};