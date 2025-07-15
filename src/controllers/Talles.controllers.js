import * as TalleService from '../services/Talles.service.js';

// Crear talle
export async function CrearTalleController(req, res, next) {
  try {
    const id = await TalleService.crearTalleService(req.body);
    res.status(201).json({
      message: "Talle creado exitosamente",
      id,
    });
  } catch (error) {
    return next(error);
  }
}

// Listar talles
export async function ListarTallesController(req, res, next) {
  try {
    const talles = await TalleService.listarTallesService();
    res.status(200).json({
      message: "Listado de talles",
      talles,
      total: talles.length
    });
  } catch (error) {
    return next(error);
  }
}

// Modificar talle
export async function ModificarTalleController(req, res, next) {
  try {
    const { id } = req.params;
    await TalleService.modificarTalleService(id, req.body.nombre);
    res.status(200).json({
      message: "Talle modificado correctamente",
    });
  } catch (error) {
    return next(error);
  }
}

// Eliminar talle
export async function BorrarTalleController(req, res, next) {
  try {
    const { id } = req.params;
    await TalleService.eliminarTalleService(id);
    res.status(200).json({
      message: "Talle eliminado correctamente",
    });
  } catch (error) {
    return next(error);
  }
}
