import * as OrdenesService from "../services/Ordenes.service.js";
import * as OrdenesModel from '../models/Ordenes.model.js'
import Conexion from "../config/db.js";

// Crear orden
export async function CrearOrdenController(req, res, next) {
  try {
    const { usuario_id } = req.params; // o desde el token/session
    const { direccion_envio_id } = req.body;

    // 1. Buscar ítems del carrito
    const [carrito] = await Conexion.query(
      "SELECT producto_id, cantidad FROM carrito WHERE usuario_id = ?",
      [usuario_id]
    );

    if (!carrito.length) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    // 2. Calcular total sumando precio x cantidad de cada producto
    let total = 0;
    for (const item of carrito) {
      const [producto] = await Conexion.query(
        "SELECT precio FROM productos WHERE id = ?",
        [item.producto_id]
      );
      if (!producto.length) throw new Error("Producto no existe");
      total += producto[0].precio * item.cantidad;
    }

    // 3. Crear la orden con el total calculado
    const ordenId = await OrdenesModel.CrearOrden({
      usuario_id,
      total, // ahora sí, el total está definido
      estado: "pendiente",
      direccion_envio_id
    });

    res.status(201).json({ message: "Orden creada correctamente", id: ordenId, total });
  } catch (error) {
    next(error);
  }
}



// Listar órdenes de un usuario
export async function ListarOrdenesPorUsuarioController(req, res, next) {
  try {
    const { usuario_id } = req.params;
    const ordenes = await OrdenesService.ListarOrdenesPorUsuario(usuario_id);
    res.json({ ordenes });
  } catch (error) {
    next(error);
  }
}

// Obtener una orden por id
export async function ObtenerOrdenPorIdController(req, res, next) {
  try {
    const { id } = req.params;
    const orden = await OrdenesService.ObtenerOrdenPorId(id);
    res.json({ orden });
  } catch (error) {
    next(error);
  }
}

// Modificar orden
export async function ModificarOrdenController(req, res, next) {
  try {
    const { id } = req.params;
    await OrdenesService.ModificarOrden(id, req.body);
    res.json({ message: "Orden actualizada correctamente" });
  } catch (error) {
    next(error);
  }
}

// Eliminar orden
export async function EliminarOrdenController(req, res, next) {
  try {
    const { id } = req.params;
    await OrdenesService.EliminarOrden(id);
    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    next(error);
  }
}
