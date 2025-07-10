import * as CarritoService from '../services/Carrito.service.js'

// Agregar producto al carrito
export const agregarAlCarrito = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body; // OJO: usuario_id en el body solo para test
    if (!usuario_id || !producto_id || !cantidad) {
      return res.status(400).json({ message: 'Usuario, producto y cantidad requeridos.' });
    }
    await CarritoService.agregarAlCarrito(usuario_id, producto_id, cantidad);
    res.status(201).json({ message: 'Producto agregado al carrito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito.', error: error.message });
  }
};


// Obtener el carrito de un usuario
export const obtenerCarrito = async (req, res) => {
  try {
    const usuario_id = req.body; // Lee el ID desde query string
    if (!usuario_id) {
      return res.status(400).json({ message: 'usuario_id requerido.' });
    }
    const carrito = await CarritoService.obtenerCarrito(usuario_id);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito.', error: error.message });
  }
};



// Modificar cantidad de un producto
export const modificarCantidad = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;
    const usuario_id = req.params;

    if (!producto_id || !cantidad) {
      return res.status(400).json({ message: 'Producto y cantidad requeridos.' });
    }

    await CarritoService.modificarCantidad(usuario_id, producto_id, cantidad);
    res.json({ message: 'Cantidad actualizada.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar la cantidad.', error: error.message });
  }
};

// Eliminar un producto del carrito
export const eliminarDelCarrito = async (req, res) => {
  try {
    const {usuario_id, producto_id } = req.body;

    if (!producto_id) {
      return res.status(400).json({ message: 'Producto requerido.' });
    }

    await CarritoService.eliminarDelCarrito(usuario_id, producto_id);
    res.json({ message: 'Producto eliminado del carrito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto.', error: error.message });
  }
};

// Vaciar el carrito completo
export const vaciarCarrito = async (req, res) => {
  try {
    const usuario_id = req.body
    await CarritoService.vaciarCarrito(usuario_id);
    res.json({ message: 'Carrito vaciado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar el carrito.', error: error.message });
  }
};