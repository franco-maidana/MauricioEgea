import { Router } from "express";
import Usuario from "./Usuario.router.js";
import Productos from "./Productos.router.js";
import Carrito from "./Carrito.router.js";
import Direcciones from "./Direcciones.router.js";
import Talles from "./Talles.router.js";
import Ordenes from "./Ordenes.router.js";



const ApiRouter = Router();

ApiRouter.use("/users", Usuario);
ApiRouter.use('/productos', Productos);
ApiRouter.use('/carrito', Carrito);
ApiRouter.use('/direcciones', Direcciones);
ApiRouter.use('/talles', Talles);
ApiRouter.use('/ordenes', Ordenes);


export default ApiRouter;
