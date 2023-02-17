import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


export const validarCampos = (request: Request, response: Response, next: NextFunction) => {

  // manejo de errores
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response
      .status(400)
      .json({
        ok: false,
        errores: errores.mapped() // TODO cambiar el body
      });
  }

  next();
}