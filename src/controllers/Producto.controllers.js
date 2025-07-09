import * as ProductoService from '../services/Productos.service.js'
import * as ProductoModel from '../models/Productos.model.js'


// listo
export async function CrearProductoController(req, res, next) {
  try {
    const imagen_url = req.file ? `/products/${req.file.filename}` : null;
    // 👇 Asegurate de leer los campos desde req.body
    const { nombre, descripcion, precio, stock, categoria, activo } = req.body;

    // Opcional: convierte precio, stock, activo a tipo número/booleano si hace falta
    const datos = {
      nombre,
      descripcion,
      precio: precio ? parseFloat(precio) : null,
      stock: stock ? parseInt(stock) : null,
      categoria,
      activo: activo !== undefined ? Boolean(Number(activo)) : true, // o true por defecto
      imagen_url
    };

    // Verificación básica
    if (!nombre) throw new Error("El nombre del producto es obligatorio");

    const producto = await ProductoService.RegistrarProductos(datos);
    return res.status(201).json({
      message: "Producto creado exitosamente",
      producto
    });
  } catch (error) {
    return next(error);
  }
}

// listo
export async function ListarProductosController(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const productos = await ProductoService.ListarProductos({ limit, offset });
    const total = await ProductoModel.ContarProductos();

    res.status(200).json({
      message: 'Listado de productos',
      productos,
      total,
      limit,
      offset,
      hasMore: offset + productos.length < total
    });
  } catch (error) {
    next(error);
  }
}

// listo
export async function ModificarProductoController(req, res, next) {
  try {
    const { id } = req.params;
    console.log("Body recibido para update:", req.body); // <---- Agregar esto
    await ProductoService.ModificarProductos(id, req.body);
    res.status(200).json({ message: "Producto modificado" });
  } catch (error) {
    next(error);
  }
}

// listo
export async function BorrarProductoController(req, res, next) {
  try {
    const { id } = req.params;
    await ProductoService.BorrarProducto(id);
    res.status(200).json({
      message: "Producto eliminado"
    });
  } catch (error) {
    next(error);
  }
}

// listo
export async function SubirImagenProductoController(req, res, next) {
  try {
    const imagen_url = `/products/${req.file.filename}`;
    const { id } = req.params;
    await ProductoService.ModificarProductos(id, { imagen_url });
    res.status(200).json({
      message: "Imagen de producto subida correctamente",
      imagen_url
    });
  } catch (err) {
    next(err);
  }
}