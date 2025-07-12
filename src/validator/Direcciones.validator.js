import { body, param } from "express-validator";

export const validarCrearDireccion = [
  param("usuario_id")
    .notEmpty()
    .withMessage("El usuario_id es obligatorio")
    .isInt()
    .withMessage("El usuario_id debe ser un número"),
  body("calle").notEmpty().withMessage("La calle es obligatoria"),
  body("numero").notEmpty().withMessage("El número es obligatorio"),
  body("ciudad").notEmpty().withMessage("La ciudad es obligatoria"),
  body("provincia").notEmpty().withMessage("La provincia es obligatoria"),
  body("pais").notEmpty().withMessage("El país es obligatorio"),
  body("cp").notEmpty().withMessage("El código postal es obligatorio"),
  body("email_contacto")
    .optional()
    .isEmail()
    .withMessage("El email de contacto no es válido"),
  body("telefono_contacto")
    .optional()
    .isLength({ max: 50 })
    .withMessage("El teléfono es demasiado largo"),
  body("descripcion")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La descripción no puede superar los 255 caracteres"),
];
