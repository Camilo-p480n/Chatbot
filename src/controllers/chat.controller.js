//este archivo se encarga de recibir las peticiones del cliente y 
// enviar la respuesta correspondiente, utilizando los servicios definidos en chat.service.js

import { processMessage } from "../services/chat.service.js";

export const chat = async (req, res) => {
  try {

    const { userId, message } = req.body;

    const response = await processMessage(userId, message);

    res.json(response);

  } catch (error) {

    console.error("ERROR CHAT:", error);

    res.status(500).json({
      error: "Error procesando mensaje"
    });

  }
};