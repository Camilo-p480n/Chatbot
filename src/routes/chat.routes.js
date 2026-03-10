import { Router } from "express";
import { chat } from "../controllers/chat.controller.js";

const router = Router();

/*
Ruta principal del chatbot

POST /api/chat
Aquí se envía el mensaje del usuario
*/
router.post("/", chat);

export default router;