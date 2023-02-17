"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Rutas de Usuarios
  host + /api/usuarios
*/
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarJwt_1 = require("../middlewares/validarJwt");
const router = (0, express_1.Router)();
const { crearUsuario, loginUsuario, renovarToken } = require("../service/UsuarioService");
router.post("/", [
    (0, express_validator_1.check)("nombre", 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe ser de 6 caracteres").isLength({ min: 6 }),
    validarCampos_1.validarCampos
], crearUsuario);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("contraseña", "La contraseña debe ser de 6 caracteres").isLength({ min: 6 }),
    validarCampos_1.validarCampos
], loginUsuario);
// TODO ver si se puede juntar el de login con este
router.post("/renew", [
    validarJwt_1.validarJWT
], renovarToken);
module.exports = router;
