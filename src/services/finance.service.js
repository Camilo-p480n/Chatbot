import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/*
Servicio para responder preguntas financieras
*/
export const financeChat = async (message) => {

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Eres un asistente financiero dentro de una app llamada PocketPal tu nombre es poky.

Tu función es ayudar a los usuarios a:

- mejorar sus finanzas
- ahorrar dinero
- controlar gastos
- planificar metas
- entender ingresos y gastos

Responde de forma clara, corta y práctica.
No hables de temas que no sean financieros.
`
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return completion.choices[0].message.content;

};


console.log("✅ Finance chat initialized");