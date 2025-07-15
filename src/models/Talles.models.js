import Conexion from "../config/db.js";

export async function crearTalle({ nombre }) {
  const [result] = await Conexion.query('INSERT INTO talles (nombre) VALUES (?)', [nombre]);
  return result.insertId;
}

export async function listarTalles() {
  const [rows] = await Conexion.query('SELECT * FROM talles ORDER BY nombre ASC');
  return rows;
}

export async function modificarTalle(id, nombre) {
  await Conexion.query('UPDATE talles SET nombre = ? WHERE id = ?', [nombre, id]);
}

export async function eliminarTalle(id) {
  await Conexion.query('DELETE FROM talles WHERE id = ?', [id]);
}