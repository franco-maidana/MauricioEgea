import Conexion from "../config/db.js";

// Crear orden
export async function CrearOrden({ usuario_id, total, estado, direccion_envio_id }) {
  const [result] = await Conexion.query(
    `INSERT INTO ordenes (usuario_id, fecha, total, estado, direccion_envio_id)
      VALUES (?, NOW(), ?, ?, ?)`,
    [usuario_id, total, estado || "pendiente", direccion_envio_id]
  );
  return result.insertId;
}

// Listar órdenes de un usuario
export async function ListarOrdenesPorUsuario(usuario_id) {
  const [rows] = await Conexion.query(
    "SELECT * FROM ordenes WHERE usuario_id = ? ORDER BY fecha DESC",
    [usuario_id]
  );
  return rows;
}

// Obtener una orden por id
export async function ObtenerOrdenPorId(id) {
  const [rows] = await Conexion.query(
    "SELECT * FROM ordenes WHERE id = ?",
    [id]
  );
  return rows[0];
}

// Modificar orden (solo total, estado y dirección)
export async function ModificarOrden(id, datos) {
  const campos = [];
  const valores = [];

  if (datos.total)              { campos.push("total = ?");              valores.push(datos.total); }
  if (datos.estado)             { campos.push("estado = ?");             valores.push(datos.estado); }
  if (datos.direccion_envio_id) { campos.push("direccion_envio_id = ?"); valores.push(datos.direccion_envio_id); }

  if (campos.length === 0) throw new Error("No hay datos para actualizar.");

  valores.push(id);
  const sql = `UPDATE ordenes SET ${campos.join(", ")} WHERE id = ?`;
  await Conexion.query(sql, valores);
}

// Eliminar orden
export async function EliminarOrden(id) {
  await Conexion.query("DELETE FROM ordenes WHERE id = ?", [id]);
}