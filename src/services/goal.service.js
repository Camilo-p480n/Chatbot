import { pool } from "../db/connection.js";

/*
CREAR META
*/
export const createGoal = async (user_id, title, amount) => {

  await pool.query(
    `INSERT INTO goals
    (user_id, title, target_amount)
    VALUES (?, ?, ?)`,
    [user_id, title, amount]
  );

  return {
    message: `🎯 Meta creada: ${title} por $${amount}`
  };

};


/*
AGREGAR DINERO A META
*/
export const addGoalMoney = async (user_id, title, amount) => {

  const [rows] = await pool.query(
    `SELECT id, current_amount
     FROM goals
     WHERE user_id = ?
     AND LOWER(title) LIKE ?`,
    [user_id, `%${title.toLowerCase()}%`]
  );

  if (rows.length === 0) {
    return { message: "No encontré esa meta" };
  }

  const goal = rows[0];

  const newAmount = Number(goal.current_amount) + Number(amount);

  await pool.query(
    `UPDATE goals
     SET current_amount = ?
     WHERE id = ?`,
    [newAmount, goal.id]
  );

  return {
    message: `💰 Se agregaron $${amount} a tu meta`
  };

};


/*
CONSULTAR META
*/
export const getGoalStatus = async (user_id, title) => {

  const [rows] = await pool.query(
    `SELECT title, current_amount, target_amount
     FROM goals
     WHERE user_id = ?
     AND LOWER(title) LIKE ?`,
    [user_id, `%${title.toLowerCase()}%`]
  );

  if (rows.length === 0) {
    return { message: "No encontré esa meta" };
  }

  const goal = rows[0];

  const progress = ((goal.current_amount / goal.target_amount) * 100).toFixed(1);

  return {
    message: `🎯 Meta: ${goal.title}

💰 Ahorrado: $${goal.current_amount}
🎯 Objetivo: $${goal.target_amount}
📊 Progreso: ${progress}%`
  };

};