import { validationResult } from "express-validator";

export default function validarCampos(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array().map(e => e.msg)
    });
  }
  next();
}
