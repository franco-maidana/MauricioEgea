import * as DireccionesModel from "../models/Direcciones.model.js";

export async function CrearDireccion(datos) {
  // Validar que no exista una dirección para ese usuario
  const direcciones = await DireccionesModel.ListarDireccionesPorUsuario( datos.usuario_id );

  if (direcciones.length > 0) {
    throw new Error("El usuario ya tiene una dirección registrada");
  }
  return await DireccionesModel.CrearDireccion(datos);
}

export async function ListarDireccionesPorUsuario(usuario_id) {
  return await DireccionesModel.ListarDireccionesPorUsuario(usuario_id);
}

export async function ObtenerDireccionPorId(id) {
  return await DireccionesModel.ObtenerDireccionPorId(id);
}

export async function ModificarDireccionPorUsuarioId(usuario_id, datos) {
  await DireccionesModel.ModificarDireccionPorUsuarioId(usuario_id, datos);
}


export async function EliminarDireccion(id) {
  await DireccionesModel.EliminarDireccion(id);
}
