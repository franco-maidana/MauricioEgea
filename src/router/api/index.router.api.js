import { Router } from "express";
import Usuario from "./Usuario.router.js";
import Productos from "./Productos.router.js";
import Carrito from "./Carrito.router.js";

const ApiRouter = Router();

ApiRouter.use("/users", Usuario);
ApiRouter.use('/productos', Productos);
ApiRouter.use('/orders', Carrito);

export default ApiRouter;
