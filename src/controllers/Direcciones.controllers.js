import * as DireccionesService from "../services/Direcciones.service.js";

// Crear dirección
export async function CrearDireccionController(req, res, next) {
  try {
    const {
      calle,
      numero,
      ciudad,
      provincia,
      pais,
      cp,
      telefono_contacto,
      email_contacto,
      descripcion,
    } = req.body;

    const { usuario_id } = req.params;

    const id = await DireccionesService.CrearDireccion({
      usuario_id,
      calle,
      numero,
      ciudad,
      provincia,
      pais,
      cp,
      telefono_contacto,
      email_contacto,
      descripcion,
    });

    res.status(201).json({ message: "Dirección Registrada correctamente", id });
  } catch (error) {
    next(error);
  }
}

// Listar direcciones de un usuario
export async function ListarDireccionesPorUsuarioController(req, res, next) {
  try {
    const { usuario_id } = req.params;
    const direcciones = await DireccionesService.ListarDireccionesPorUsuario(
      usuario_id
    );
    res.json({ direcciones });
  } catch (error) {
    next(error);
  }
}

// Obtener una dirección por id
export async function ObtenerDireccionPorIdController(req, res, next) {
  try {
    const { id } = req.params;
    const direccion = await DireccionesService.ObtenerDireccionPorId(id);
    res.json({ direccion });
  } catch (error) {
    next(error);
  }
}

// Modificar dirección
export async function ModificarDireccionController(req, res, next) {
  try {
    const { usuario_id } = req.params; // usuario_id viene por URL
    await DireccionesService.ModificarDireccionPorUsuarioId(usuario_id, req.body);
    res.json({ message: "Dirección actualizada correctamente" });
  } catch (error) {
    next(error);
  }
}


// Eliminar dirección
export async function EliminarDireccionController(req, res, next) {
  try {
    const { id } = req.params;
    await DireccionesService.EliminarDireccion(id);
    res.json({ message: "Dirección eliminada correctamente" });
  } catch (error) {
    next(error);
  }
}
