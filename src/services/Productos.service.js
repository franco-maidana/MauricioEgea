import * as ProductosModel from "../models/Productos.model.js";

export async function RegistrarProductos(datos) {
  const existente = await ProductosModel.BuscarProductoPorNombreYCategoria(datos.nombre, datos.categoria);
  if (existente) throw new Error("Ya existe un producto con ese nombre y categoría");

  const id = await ProductosModel.CrearProductos(datos); // SIN destructurar
  return { id, ...datos };
}


export async function ListarProductos({ limit, offset }) {
  return await ProductosModel.ObtenerProductosPaginados({ limit, offset });
}



export async function ModificarProductos(id, datos) {
  // datos debería ser req.body, que es un objeto con los campos
  await ProductosModel.ActualizarProducto(id, datos);
}


export async function BorrarProducto(id) {
  await ProductosModel.EliminarProductos(id);
}
