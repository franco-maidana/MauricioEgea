import {
  CrearItemCarrito,
  EliminarItemCarrito,
  ModificarCantidadCarrito,
  ObtenerCarritoUsuario,
  VaciarCarritoUsuario,
} from "../models/Carrito.model.js";

// Agregar un producto al carrito
export const agregarAlCarrito = async (usuario_id, producto_id, cantidad) => {
  // Acá podrías agregar validaciones extra, por ejemplo: verificar stock, cantidad mínima, etc.
  return await CrearItemCarrito({ usuario_id, producto_id, cantidad });
};

// Obtener todo el carrito de un usuario
export const obtenerCarrito = async (usuario_id) => {
  const items = await ObtenerCarritoUsuario(usuario_id);
  const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return {
    items,
    total
  };
};


// Modificar la cantidad de un producto en el carrito
export const modificarCantidad = async (usuario_id, producto_id, cantidad) => {
  return await ModificarCantidadCarrito({ usuario_id, producto_id, cantidad });
};

// Eliminar un producto del carrito
export const eliminarDelCarrito = async (usuario_id, producto_id) => {
  return await EliminarItemCarrito({ usuario_id, producto_id });
};

// Vaciar el carrito del usuario
export const vaciarCarrito = async (usuario_id) => {
  return await VaciarCarritoUsuario(usuario_id);
};