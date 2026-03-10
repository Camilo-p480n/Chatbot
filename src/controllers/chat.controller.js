import { processMessage } from "../services/chat.service.js";

export const chat = async (req, res) => {

  try {

    // mensaje que envía el usuario
    const { message, user_id } = req.body;

    // enviamos el mensaje al servicio principal
    const response = await processMessage(message, user_id);

    // respondemos al usuario
    res.json({
      reply: response
    });

  } catch (error) {

    console.error("ERROR CHAT:", error);

    res.status(500).json({
      error: "Error procesando el mensaje"
    });

  }

};