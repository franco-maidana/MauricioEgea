import Conexion from "../config/db.js";

export async function CrearProductos(datos) {
  const { nombre, descripcion, precio, stock, imagen_url, categoria, activo } =
    datos;
  const [result] = await Conexion.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria, activo) VALUES (?,?,?,?,?,?,?)",
    [nombre, descripcion, precio, stock, imagen_url, categoria, activo]
  );
  return result.insertId;
}

export async function BuscarProductoPorNombreYCategoria(nombre, categoria) {
  const [rows] = await Conexion.query(
    "SELECT * FROM productos WHERE nombre = ? AND categoria = ?",
    [nombre, categoria]
  );
  return rows[0];
}

export async function ObtenerProductos() {
  const [rows] = await Conexion.query("SELECT * FROM productos");
  return rows;
}

export async function ObtenerProductosPaginados({ limit, offset }) {
  const [rows] = await Conexion.query(
    "SELECT * FROM productos LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return rows;
}

export async function ContarProductos() {
  const [rows] = await Conexion.query(
    "SELECT COUNT(*) as total FROM productos"
  );
  return rows[0].total;
}

export async function BuscarProductosPorId(id) {
  const [rows] = await Conexion.query("SELECT * FROM productos WHERE = ?", [
    id,
  ]);
  return rows[0];
}

export async function ActualizarProducto(id, datos) {
  const campos = [];
  const valores = [];

  if (datos.nombre !== undefined && datos.nombre !== "") { campos.push('nombre = ?'); valores.push(datos.nombre); }
  if (datos.descripcion !== undefined && datos.descripcion !== "") { campos.push('descripcion = ?'); valores.push(datos.descripcion); }
  if (datos.precio !== undefined && datos.precio !== "") { campos.push('precio = ?'); valores.push(Number(datos.precio)); }
  if (datos.stock !== undefined && datos.stock !== "") { campos.push('stock = ?'); valores.push(Number(datos.stock)); }
  if (datos.imagen_url !== undefined && datos.imagen_url !== "") { campos.push('imagen_url = ?'); valores.push(datos.imagen_url); }
  if (datos.categoria !== undefined && datos.categoria !== "") { campos.push('categoria = ?'); valores.push(datos.categoria); }
  if (datos.activo !== undefined && datos.activo !== "") { campos.push('activo = ?'); valores.push(Boolean(Number(datos.activo))); }

  if (campos.length === 0) throw new Error('No hay datos para actualizar!!!');

  valores.push(id);

  const sql = `UPDATE productos SET ${campos.join(', ')} WHERE id = ?`;
  await Conexion.query(sql, valores);
}

export async function EliminarProductos(id) {
  await Conexion.query("DELETE FROM productos WHERE id = ? ", [id]);
}
