"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jwt = require("jsonwebtoken");
const validarJWT = (request, response, next) => {
    // x-token headers
    const token = request.header("x-token");
    if (!token) {
        return response.status(401)
            .json({
            ok: false,
            mensaje: "Error en la autenticacion"
        });
    }
    try {
        const payload = jwt.verify(token, "Esto-Es-UnA-Palbr@_SecretA12341267");
        request.body.nombre = payload.nombre;
        request.body.uid = payload.uid;
    }
    catch (error) {
        return response.status(401)
            .json({
            ok: false,
            mensaje: "Token no valido"
        });
    }
    next();
};
exports.validarJWT = validarJWT;
