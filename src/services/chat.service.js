import { interpretMessage } from "./ai.service.js";
import { handleExpense } from "./expense.service.js";
import { handleIncome } from "./income.service.js";
import { getExpenses, getIncome } from "./query.service.js";
import { createGoal, addGoalMoney, getGoalStatus } from "./goal.service.js";
import { financeChat } from "./finance.service.js";

export const processMessage = async (message, user_id) => {

  // la IA interpreta el mensaje
  const ai = await interpretMessage(message);

  // registrar gasto
  if (ai.type === "expense") {

    await handleExpense(user_id, ai);

    return "✅ Gasto registrado";
  }

  // registrar ingreso
  if (ai.type === "income") {

    await handleIncome(user_id, ai);

    return "✅ Ingreso registrado";
  }

  // consultar gastos
  if (ai.type === "query_expense") {

    const total = await getExpenses(user_id);

    return `Tus gastos este mes son $${total}`;
  }

  // consultar ingresos
  if (ai.type === "query_income") {

    const total = await getIncome(user_id);

    return `Tus ingresos este mes son $${total}`;
  }

  // resumen
  if (ai.type === "query_summary") {

    const expenses = await getExpenses(user_id);
    const income = await getIncome(user_id);

    const balance = income - expenses;

    return `Resumen del mes:

Ingresos: $${income}
Gastos: $${expenses}
Balance: $${balance}`;
  }

  // conversación financiera
 if (ai.type === "conversation") {

  const response = await financeChat(message);

  return {
    message: response
  };

}

  // crear meta
if (ai.type === "goal_create") {
  return await createGoal(user_id, ai.title, ai.amount);
}

// agregar dinero a meta
if (ai.type === "goal_add") {
  return await addGoalMoney(user_id, ai.title, ai.amount);
}

// ver estado meta
if (ai.type === "goal_status") {
  return await getGoalStatus(user_id, ai.title);
}

};

