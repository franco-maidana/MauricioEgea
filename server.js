import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import Conexion from "./src/config/db.js";

// 1. Crear el servidor
const server = express();

// 2. Middlewares globales
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/avatars", express.static("public/avatars"));
server.use("/products", express.static("public/products"));
server.use(cookieParser());
server.use(cors());

// 3. Rutas principales
server.use("/", router);

// 4. Middlewares para rutas no encontradas y errores
server.use(pathHandler);
server.use(errorHandler);

// 5. Levantar el servidor
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("Server ready on port " + PORT);
  Conexion;
});
