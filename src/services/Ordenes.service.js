import * as OrdenesModel from '../models/Ordenes.model.js'

export async function CrearOrden(datos) {
  return await OrdenesModel.CrearOrden(datos);
}

export async function ListarOrdenesPorUsuario(usuario_id) {
  return await OrdenesModel.ListarOrdenesPorUsuario(usuario_id);
}

export async function ObtenerOrdenPorId(id) {
  return await OrdenesModel.ObtenerOrdenPorId(id);
}

export async function ModificarOrden(id, datos) {
  await OrdenesModel.ModificarOrden(id, datos);
}

export async function EliminarOrden(id) {
  await OrdenesModel.EliminarOrden(id);
}
