import { Router } from "express";
import * as TalleControllers from '../../controllers/Talles.controllers.js'

const Talles = Router()

Talles.post('/create', TalleControllers.CrearTalleController);
Talles.get('/listar', TalleControllers.ListarTallesController);
Talles.put('/update/:id', TalleControllers.ModificarTalleController);
Talles.delete('/destroi/:id', TalleControllers.BorrarTalleController);


export default Talles