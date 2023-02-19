"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jwt = require("jsonwebtoken");
const generarJWT = (uid, nombre) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, nombre };
        jwt.sign(payload, "Esto-Es-UnA-Palbr@_SecretA12341267", {
            expiresIn: "24h"
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generarJWT = generarJWT;
