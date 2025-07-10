import Conexion from "../config/db.js";

export const CrearItemCarrito = async ({usuario_id, producto_id, cantidad}) => {
  const [rows] = await Conexion.query(
    'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?,?,?) ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad)',
    [usuario_id, producto_id, cantidad]
  );
  return rows
}

export const ObtenerCarritoUsuario = async (usuario_id) => {
  const [rows] = await Conexion.query(
    `SELECT c.id, c.producto_id, c.cantidad, c.fecha_agregado, p.nombre, p.precio, p.imagen_url
      FROM carrito c
      JOIN productos p ON c.producto_id = p.id
      WHERE c.usuario_id = ?`,
      [usuario_id]
  );
  return rows
}

export const ModificarCantidadCarrito = async ({ usuario_id, producto_id, cantidad }) => {
  const [rows] = await Conexion.query(
    `UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?`,
    [cantidad, usuario_id, producto_id]
  );
  return rows;
};

export const EliminarItemCarrito = async ({ usuario_id, producto_id }) => {
  const [rows] = await Conexion.query(
    `DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?`,
    [usuario_id, producto_id]
  );
  return rows;
};

export const VaciarCarritoUsuario = async (usuario_id) => {
  const [rows] = await Conexion.query(
    `DELETE FROM carrito WHERE usuario_id = ?`,
    [usuario_id]
  );
  return rows;
};