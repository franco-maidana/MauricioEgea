import { v2 as cloudinary } from "cloudinary";
import * as ProductoService from "../services/Productos.service.js";
import * as ProductoModel from "../models/Productos.model.js";

// listo
export async function CrearProductoController(req, res, next) {
  try {
    let imagen_url = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "productos" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(req.file.buffer);
      });
      imagen_url = result.secure_url;
    } else {
      console.log("No se recibió archivo para subir a Cloudinary.");
    }

    const { nombre, descripcion, precio, stock, categoria, activo } = req.body;

    const datos = {
      nombre,
      descripcion,
      precio: precio ? parseFloat(precio) : null,
      stock: stock ? parseInt(stock) : null,
      categoria,
      activo: activo !== undefined ? Boolean(Number(activo)) : true,
      imagen_url,
    };

    if (!nombre) throw new Error("El nombre del producto es obligatorio");

    const producto = await ProductoService.RegistrarProductos(datos);

    return res.status(201).json({
      message: "Producto creado exitosamente",
      producto,
    });
  } catch (error) {
    console.log("Error general en CrearProductoController:", error); // 👈
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
      message: "Listado de productos",
      productos,
      total,
      limit,
      offset,
      hasMore: offset + productos.length < total,
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
      message: "Producto eliminado",
    });
  } catch (error) {
    next(error);
  }
}

// listo
export async function SubirImagenProductoController(req, res, next) {
  try {
    let imagen_url = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "productos" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });
      imagen_url = result.secure_url;
    }

    const { id } = req.params;
    await ProductoService.ModificarProductos(id, { imagen_url });
    res.status(200).json({
      message: "Imagen de producto subida correctamente",
      imagen_url,
    });
  } catch (err) {
    next(err);
  }
}
