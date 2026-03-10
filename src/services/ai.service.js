import OpenAI from "openai";
import dotenv from "dotenv";
import { getCategories } from "./category.service.js";

dotenv.config();

// crear cliente de OpenAI usando tu API KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const interpretMessage = async (message) => {

  // obtener categorias desde la base de datos
  const expenseCategories = await getCategories("expense");
  const incomeCategories = await getCategories("income");

  // convertirlas en texto para que la IA las conozca
  const expenseList = expenseCategories.map(c => c.name).join(", ");
  const incomeList = incomeCategories.map(c => c.name).join(", ");

  const prompt = `
Eres un asistente financiero.

Tu trabajo es analizar el mensaje del usuario y responder SOLO en JSON.

tambien cuando te hagan preguntas relacionadas con todo el tema de  finanzas personales, debes responder de forma conversacional, dando consejos, recomendaciones, explicaciones, etc. pero sin salirte del tema financiero.

Tipos posibles:
expense
income
query_expense
query_income
query_summary
conversation
goal_create
goal_add
goal_status


Categorias de gastos:
${expenseList}

Categorias de ingresos:
${incomeList}

Ejemplo de respuestas:

{
"type":"expense",
"amount":20000,
"category":"comida",
"description":"almuerzo"
}

{
"type":"query_expense"
}

{
"type":"conversation"
}

Mensaje del usuario:
${message}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  let response = completion.choices[0].message.content;

  // limpiar posible markdown de la IA
  response = response.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(response);
};

console.log("✅ OpenAI client initialized");