import { Router } from "express";
import {
  BorrarProductoController,
  CrearProductoController,
  ListarProductosController,
  ModificarProductoController,
  SubirImagenProductoController
} from "../../controllers/Producto.controllers.js";
import upLoadProductImage from "../../middlewares/upLoadProductImage.js";

const Productos = Router();

Productos.post('/create', upLoadProductImage.single("imagen"), CrearProductoController);
Productos.get('/list', ListarProductosController);
Productos.put('/update/:id', ModificarProductoController);
Productos.post("/upload-image/:id", upLoadProductImage.single("imagen"), SubirImagenProductoController);
Productos.delete('/destroi/:id', BorrarProductoController);

export default Productos;
