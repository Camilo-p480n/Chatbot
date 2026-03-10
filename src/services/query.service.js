import { pool } from "../db/connection.js";

// total de gastos del mes
export const getExpenses = async (user_id) => {

  const [rows] = await pool.query(
    `SELECT SUM(amount) as total
     FROM transactions
     WHERE user_id = ?
     AND type = 'expense'
     AND MONTH(date)=MONTH(CURDATE())`,
    [user_id]
  );

  return rows[0].total || 0;
};


// total de ingresos del mes
export const getIncome = async (user_id) => {

  const [rows] = await pool.query(
    `SELECT SUM(amount) as total
     FROM transactions
     WHERE user_id = ?
     AND type = 'income'
     AND MONTH(date)=MONTH(CURDATE())`,
    [user_id]
  );

  return rows[0].total || 0;
};