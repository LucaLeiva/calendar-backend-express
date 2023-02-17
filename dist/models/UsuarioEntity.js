"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contraseña: {
        type: String,
        require: true
    }
});
exports.UsuarioEntity = (0, mongoose_1.model)("Usuario", UsuarioSchema);
