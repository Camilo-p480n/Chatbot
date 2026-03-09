import { pool } from "../db/connection.js";
import { detectCategory } from "./category.service.js";

export const handleExpense = async (userId, data) => {

  const { amount, description } = data;

  if (!amount) {
    return { message: "No pude detectar el monto del gasto" };
  }

  const categoryId = await detectCategory(userId, description, "expense");

  await pool.query(
    `INSERT INTO transactions
    (user_id, category_id, type, amount, description, date)
    VALUES (?, ?, 'expense', ?, ?, CURDATE())`,
    [userId, categoryId || 18, amount, description]
  );

  return {
    message: `Gasto registrado: ${amount}`
  };

};