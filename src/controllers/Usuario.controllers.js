import * as UsuarioService from "../services/Usuarios.service.js";
import * as UsuarioModel from '../models/Usuario.model.js'
import cloudinary from 'cloudinary';

// listo
export async function CrearUsuarioControllers(req, res, next) {
  try {
    const usuario = await UsuarioService.RegistrarUsuario(req.body);
    res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario,
    });
  } catch (error) {
    return next(error);
  }
}

// listo
export async function ListarUsuarioControllers(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const usuario = await UsuarioService.ListarUsuario({limit, offset});
    const total = await UsuarioModel.ContarUsuarios();

    res.status(201).json({
      message: "Listado de usuarios",
      usuario,
      total,
      limit,
      offset,
      hasMore: offset + usuario.length < total
    });
  } catch (error) {
    return next(error);
  }
}

// listo
export async function ModificarUsuarioControllers(req, res, next) {
  try {
    const { id } = req.params;
    await UsuarioService.ModificarUsuario(id, req.body);
    res.status(201).json({
      message: "Usuario modificado correctamente",
    });
  } catch (error) {
    return next(error);
  }
}

// listo
export async function ActualizarAvatarController(req, res, next) {
  try {
    const { id } = req.params;

    if (!req.file) throw new Error("No se subió ninguna imagen");

    // Subir a Cloudinary (buffer)
    const resultado = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        {
          folder: "usuarios", // opcional, carpeta en cloudinary
          public_id: `avatar_${id}_${Date.now()}`,
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Guardar URL en la base de datos
    const avatar_url = resultado.secure_url;

    await UsuarioService.ModificarUsuario(id, { avatar_url });

    res.status(201).json({
      message: "Imagen de perfil actualizada exitosamente",
      avatar_url,
    });
  } catch (err) {
    next(err);
  }
}

// listo
export async function BorrarUsuarioControllers(req, res, next) {
  try {
    const { id } = req.params;
    await UsuarioService.BorrarUsuario(id);
    res.status(201).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return next(error);
  }
}
