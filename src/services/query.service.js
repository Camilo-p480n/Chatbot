import { pool } from "../db/connection.js";

export const handleQuery = async (userId) => {

  const [rows] = await pool.query(
    `SELECT COALESCE(SUM(amount),0) AS total
     FROM transactions
     WHERE user_id = ?
     AND type = 'expense'
     AND MONTH(date) = MONTH(CURDATE())
     AND YEAR(date) = YEAR(CURDATE())`,
    [userId]
  );

  return {
    message: `Este mes has gastado ${rows[0].total}`
  };

};