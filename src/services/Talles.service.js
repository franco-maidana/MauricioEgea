import * as TalleModel from '../models/Talles.models.js';

export async function crearTalleService(data) {
  return TalleModel.crearTalle(data);
}

export async function listarTallesService() {
  return TalleModel.listarTalles();
}

export async function modificarTalleService(id, nombre) {
  await TalleModel.modificarTalle(id, nombre);
}

export async function eliminarTalleService(id) {
  await TalleModel.eliminarTalle(id);
}
