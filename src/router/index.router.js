import { Router } from "express";
import ApiRouter from "./api/index.router.api.js";

const router = Router()

router.use('/api', ApiRouter)

export default router