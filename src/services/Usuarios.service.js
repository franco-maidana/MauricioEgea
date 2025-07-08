import bcrypt from "bcrypt";
import * as UsuarioModel from "../models/Usuario.model.js";
import {
  emailDominioValido,
  emailFormatoValido,
} from "../validator/Email.validator.js";

export async function RegistrarUsuario({ nombre, email, password, role }) {
  // validaciones
  if (!emailFormatoValido(email)) throw new Error("El email no es válido");
  if (!emailDominioValido(email))
    throw new Error(
      "Solo se aceptan emails de proveedores conocidos (gmail, hotmail, outlook, yahoo, icloud, live)"
    );

  // se fija si existe el email en la base de datos
  const existente = await UsuarioModel.BuscarUsuarioPorEmail(email);
  if (existente) throw new Error("el email ya se encuentra registrado");

  // hashea la password
  const hash = await bcrypt.hash(password, 10);

const id = await UsuarioModel.CrearUsuario({
    nombre,
    email,
    password: hash,
    role: role || "cliente",
  });

  return { id, nombre, email, role: role || "cliente" };
}

export async function ListarUsuario() {
  return await UsuarioModel.ObtenerUsuario();
}

export async function ModificarUsuario(id, datos) {
  await UsuarioModel.ActualizarUsuario(id, datos);
}

export async function BorrarUsuario(id) {
  await UsuarioModel.EliminarUsuario(id);
}
