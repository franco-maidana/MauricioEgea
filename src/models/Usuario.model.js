import Conexion from "../config/db.js";

// crear
export async function CrearUsuario({ nombre, email, password, role }) {
  const [result] = await Conexion.query(
    "INSERT INTO usuarios (nombre, email, password, role ) VALUE (?,?,?,?)",
    [nombre, email, password, role]
  );
  return result.insertId;
}

// buscar por email
export async function BuscarUsuarioPorEmail(email) {
  const [rows] = await Conexion.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
}

// obtenemos usuario
export async function ObtenerUsuario() {
  const [rows] = await Conexion.query(
    "SELECT  id , nombre, email, role, avatar_url, fecha_registro FROM usuarios"
  );
  return rows;
}

// modificar usuario
export async function ActualizarUsuario(id, datos) {
  const campos = [];
  const valores = [];
  const rolesValidos = ["cliente", "admin"];

  if (datos.nombre && datos.nombre.trim() !== "") {
    campos.push("nombre = ?");
    valores.push(datos.nombre);
  }
  if (datos.email && datos.email.trim() !== "") {
    campos.push("email = ?");
    valores.push(datos.email);
  }
  if (datos.role && rolesValidos.includes(datos.role)) {
    campos.push("role = ?");
    valores.push(datos.role);
  }
  if (datos.avatar_url && datos.avatar_url.trim() !== "") {
    campos.push("avatar_url = ?");
    valores.push(datos.avatar_url);
  }

  if (campos.length === 0) {
    throw new Error("No hay datos para actualizar");
  }

  valores.push(id);
  const sql = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = ?`;

  await Conexion.query(sql, valores);
}



// eliminamos usuario
export async function EliminarUsuario(id) {
  await Conexion.query("DELETE FROM usuarios WHERE id = ?", [id]);
}

export async function ObtenerUsuarioPaginados({ limit, offset }) {
  const [rows] = await Conexion.query(
    "SELECT id, nombre, email, role FROM usuarios LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return rows;
}

export async function ContarUsuarios() {
  const [rows] = await Conexion.query("SELECT COUNT(*) as total FROM usuarios");
  return rows[0].total;
}
