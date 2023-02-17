"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (request, response, next) => {
    // manejo de errores
    const errores = (0, express_validator_1.validationResult)(request);
    if (!errores.isEmpty()) {
        return response
            .status(400)
            .json({
            ok: false,
            errores: errores.mapped() // TODO cambiar el body
        });
    }
    next();
};
exports.validarCampos = validarCampos;
