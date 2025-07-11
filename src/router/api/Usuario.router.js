import { Router } from "express";
import {
  BorrarUsuarioControllers,
  CrearUsuarioControllers,
  ListarUsuarioControllers,
  ModificarUsuarioControllers,
  ActualizarAvatarController
} from "../../controllers/Usuario.controllers.js";
import uploadAvatar from "../../middlewares/upLoadAvatarCloudinary.js";

const Usuario = Router()

Usuario.post('/create', CrearUsuarioControllers);
Usuario.get('/list', ListarUsuarioControllers);
Usuario.put('/update/:id', ModificarUsuarioControllers);
Usuario.put('/avatar/:id', uploadAvatar.single("avatar"), ActualizarAvatarController);
Usuario.delete('/destroi/:id', BorrarUsuarioControllers);

export default Usuario