import { Router } from "express";
import Usuario from "./Usuario.router.js";

const ApiRouter = Router();

ApiRouter.use("/users", Usuario);

export default ApiRouter;
