import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import Conexion from "./src/config/db.js";
import { v2 as cloudinary } from "cloudinary";

// Configuración Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// IMPORTA el router de productos DIRECTAMENTE
import Productos from "./src/router/api/Productos.router.js"; // <-- O AJUSTA EL PATH si no es este

const server = express();

// 1. Montá /api/productos DIRECTAMENTE antes de los body parsers
server.use("/api/productos", Productos);

// 2. Middlewares globales
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/avatars", express.static("public/avatars"));
server.use("/products", express.static("public/products"));
server.use(cookieParser());
server.use(cors());

// 3. Resto de rutas (incluida la raíz /api y /api/users, etc)
server.use("/", router);

// 4. Middlewares de errores
server.use(pathHandler);
server.use(errorHandler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("Server ready on port " + PORT);
  Conexion;
});
