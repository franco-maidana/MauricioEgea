import { Router } from "express";
import {
  CrearOrdenController,
  EliminarOrdenController,
  ListarOrdenesPorUsuarioController,
  ModificarOrdenController,
  ObtenerOrdenPorIdController,
} from "../../controllers/Ordenes.controllers.js";

const Ordenes = Router();

Ordenes.post("/create/:usuario_id", CrearOrdenController);
Ordenes.get("/usuario/:usuario_id", ListarOrdenesPorUsuarioController); // listar por usuario
Ordenes.get("/:id", ObtenerOrdenPorIdController); // obtener por id
Ordenes.put("/update/:id", ModificarOrdenController); // modificar por id
Ordenes.delete("/delete/:id", EliminarOrdenController); // eliminar por id

export default Ordenes;
