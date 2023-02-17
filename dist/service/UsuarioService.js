"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioEntity_1 = require("../models/UsuarioEntity");
const jwt_1 = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const crearUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = request.body;
    try {
        let usuario = yield UsuarioEntity_1.UsuarioEntity.findOne({ email, contraseña });
        if (usuario) {
            return response.status(409).json({
                ok: false,
                mensaje: "Ya existe un usuario con ese correo"
            });
        }
        usuario = new UsuarioEntity_1.UsuarioEntity(request.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);
        yield usuario.save();
        // generar JWT
        const token = yield (0, jwt_1.generarJWT)(usuario.id, usuario.nombre);
        return response
            .status(201)
            .json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        response
            .status(500)
            .json({
            ok: false,
            mensaje: "Error del sistema"
        });
    }
});
const loginUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contraseña } = request.body;
    try {
        let usuario = yield UsuarioEntity_1.UsuarioEntity.findOne({ email });
        if (!usuario) {
            return response.status(400)
                .json({
                ok: false,
                mensaje: "El usuario y contraseña no existe"
            });
        }
        // comparar contraseñas
        if (!bcrypt.compareSync(contraseña, usuario.contraseña)) {
            return response.status(400)
                .json({
                ok: false,
                mensaje: "Contraseña incorrecta"
            });
        }
        // generar JWT
        const token = yield (0, jwt_1.generarJWT)(usuario.id, usuario.nombre);
        return response.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        response.status(500)
            .json({
            ok: false,
            mensaje: "Error del sistema"
        });
    }
});
const renovarToken = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = request.body.uid;
    const nombre = request.body.nombre;
    // Generar JWT
    const token = yield (0, jwt_1.generarJWT)(uid, nombre);
    return response.json({
        ok: true,
        uid: uid,
        nombre: nombre,
        token: token
    });
});
module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};
