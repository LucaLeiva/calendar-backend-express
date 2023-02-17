import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");


export const validarJWT = (request: Request, response: Response, next: NextFunction) => {
  
  // x-token headers
  const token = request.header("x-token");
  
  if (!token) {
    return response.status(401)
      .json({
        ok: false,
        mensaje: "Error en la autenticacion"
      })
  }

  try {
    
    const payload = jwt.verify(
      token,
      "Esto-Es-UnA-Palbr@_SecretA12341267"
    );

    request.body.nombre = payload.nombre;
    request.body.uid = payload.uid;

  } catch (error) {
    return response.status(401)
      .json({
        ok: false,
        mensaje: "Token no valido"
      })
  }

  next();
}