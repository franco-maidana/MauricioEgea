import { Router } from "express";
import {
  BorrarProductoController,
  CrearProductoController,
  ListarProductosController,
  ModificarProductoController,
  SubirImagenProductoController
} from "../../controllers/Producto.controllers.js";
import uploadCloudinaryImage from "../../middlewares/uploadCloudinaryImage.js";

const Productos = Router();

Productos.post('/create', uploadCloudinaryImage.single("imagen"), CrearProductoController);
Productos.get('/list', ListarProductosController);
Productos.put('/update/:id', ModificarProductoController);
Productos.post("/upload-image/:id", uploadCloudinaryImage.single("imagen"), SubirImagenProductoController);
Productos.delete('/destroi/:id', BorrarProductoController);

export default Productos;
