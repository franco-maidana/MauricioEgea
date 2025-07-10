import { Router } from "express";
import * as CarritoController from "../../controllers/Carrito.controllers.js";

const Carrito = Router();

// Todas las rutas asumen que el usuario está autenticado y su ID está en req.user.id

// Agregar producto al carrito
Carrito.post("/agregar", CarritoController.agregarAlCarrito);

// Obtener el carrito del usuario
Carrito.get("/obtener", CarritoController.obtenerCarrito);

// Modificar cantidad de un producto en el carrito
Carrito.put("/update/:id", CarritoController.modificarCantidad);

// Eliminar producto del carrito (por producto_id en params)
Carrito.delete("/destroi", CarritoController.eliminarDelCarrito);

// Vaciar todo el carrito
Carrito.delete("/vaciar-carrito", CarritoController.vaciarCarrito);

export default Carrito;
