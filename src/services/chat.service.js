import { interpretMessage } from "./ai.service.js";
import { handleExpense } from "./expense.service.js";
import { handleIncome } from "./income.service.js";
import { handleQuery } from "./query.service.js";

export const processMessage = async (userId, message) => {

  const intent = await interpretMessage(message);

  if (intent.type === "expense") {
    return await handleExpense(userId, intent);
  }

  if (intent.type === "income") {
    return await handleIncome(userId, intent);
  }

  if (intent.type === "query") {
    return await handleQuery(userId, intent);
  }

  return {
    message: "No entendí tu solicitud"
  };
};