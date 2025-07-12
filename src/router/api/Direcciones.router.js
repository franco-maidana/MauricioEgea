import { Router } from "express";
import {
  CrearDireccionController,
  EliminarDireccionController,
  ListarDireccionesPorUsuarioController,
  ModificarDireccionController,
  ObtenerDireccionPorIdController,
} from "../../controllers/Direcciones.controllers.js";
import {validarCrearDireccion} from '../../validator/Direcciones.validator.js'
import validarCampos from "../../middlewares/validarCampos.mid.js";

const Direcciones = Router();

Direcciones.post("/create/:usuario_id", validarCrearDireccion, validarCampos, CrearDireccionController);
Direcciones.get("/listado/usuario/:usuario_id", ListarDireccionesPorUsuarioController);
Direcciones.get("/listado/:id", ObtenerDireccionPorIdController);
Direcciones.put("/update/:usuario_id", ModificarDireccionController);
Direcciones.delete("/destroi/:id", EliminarDireccionController);


export default Direcciones;
