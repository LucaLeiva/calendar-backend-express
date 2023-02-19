import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from "../middlewares/validarJwt";

/*
  Rutas de Usuarios
  host + /api/usuarios
*/

export const usuarioController: Router = Router();
const { crearUsuario, loginUsuario, renovarToken } = require("../service/UsuarioService")

usuarioController.post("/",
  [ // middlewares, en este caso de validacion y chequeo de validaciones
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("contraseña", "La contraseña debe ser de 6 caracteres").isLength({min: 6}),
    validarCampos
  ],
  crearUsuario);

  usuarioController.post("/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("contraseña", "La contraseña debe ser de 6 caracteres").isLength({min: 6}),
    validarCampos
  ],
  loginUsuario);

// TODO ver si se puede juntar el de login con este
usuarioController.post("/renew",
  [
    validarJWT
  ],
  renovarToken);