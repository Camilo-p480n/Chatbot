import app from "./src/app.js";
import dotenv from "dotenv";
import "./src/db/connection.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 PocketPal AI corriendo en puerto ${PORT}`);
});