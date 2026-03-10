import express from "express";
import chatRoutes from "./routes/chat.routes.js";


const app = express();

/*
Middleware para que Express
pueda leer JSON del body
*/
app.use(express.json());

/*
Ruta base del chatbot

todo lo que vaya a:
POST /api/chat

se enviará a chat.routes.js
*/
app.use("/api/chat", chatRoutes);

/*
Ruta de prueba
sirve para verificar que el servidor funciona
*/
app.get("/", (req, res) => {
  res.send("PocketPal AI funcionando 🚀");
});


       

export default app;