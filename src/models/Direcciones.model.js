import Conexion from "../config/db.js";

// Crear dirección
export async function CrearDireccion({
  usuario_id,
  calle,
  numero,
  ciudad,
  provincia,
  pais,
  telefono_contacto,
  email_contacto,
  descripcion,
  cp,
}) {
  const [result] = await Conexion.query(
    "INSERT INTO direcciones (usuario_id, calle, numero, ciudad, provincia, pais, telefono_contacto, email_contacto, descripcion,  cp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [usuario_id, calle, numero, ciudad, provincia, pais, telefono_contacto, email_contacto, descripcion, cp]
  );
  return result.insertId;
}

// Listar direcciones por usuario
export async function ListarDireccionesPorUsuario(usuario_id) {
  const [rows] = await Conexion.query(
    "SELECT * FROM direcciones WHERE usuario_id = ?",
    [usuario_id]
  );
  return rows;
}

// Obtener una dirección por id
export async function ObtenerDireccionPorId(id) {
  const [rows] = await Conexion.query(
    "SELECT * FROM direcciones WHERE id = ?",
    [id]
  );
  return rows[0];
}

// Modificar dirección
// Modificar dirección usando usuario_id
export async function ModificarDireccionPorUsuarioId(usuario_id, datos) {
  const campos = [];
  const valores = [];

  if (datos.calle)            { campos.push("calle = ?");            valores.push(datos.calle); }
  if (datos.numero)           { campos.push("numero = ?");           valores.push(datos.numero); }
  if (datos.ciudad)           { campos.push("ciudad = ?");           valores.push(datos.ciudad); }
  if (datos.provincia)        { campos.push("provincia = ?");        valores.push(datos.provincia); }
  if (datos.pais)             { campos.push("pais = ?");             valores.push(datos.pais); }
  if (datos.cp)               { campos.push("cp = ?");               valores.push(datos.cp); }
  if (datos.telefono_contacto){ campos.push("telefono_contacto = ?"); valores.push(datos.telefono_contacto); }
  if (datos.email_contacto)   { campos.push("email_contacto = ?");    valores.push(datos.email_contacto); }
  if (datos.descripcion)      { campos.push("descripcion = ?");       valores.push(datos.descripcion); }

  if (campos.length === 0) throw new Error("No hay datos para actualizar.");

  valores.push(usuario_id); // usuario_id va al final
  const sql = `UPDATE direcciones SET ${campos.join(", ")} WHERE usuario_id = ?`;
  const [result] = await Conexion.query(sql, valores);
  if (result.affectedRows === 0) throw new Error("No se encontró dirección para ese usuario.");
}


// Eliminar dirección
export async function EliminarDireccion(id) {
  await Conexion.query("DELETE FROM direcciones WHERE id = ?", [id]);
}
