"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./database/config");
const UsuarioController_1 = require("./controller/UsuarioController");
const EventosController_1 = require("./controller/EventosController");
const cors = require("cors");
require("dotenv").config(); // con esto importo las variables de entorno
// crear el servidor de expres
const app = (0, express_1.default)();
// Base de datos
(0, config_1.dbConnection)();
// CORS
app.use(cors());
// use() es un middleware, que se ejecutara siempre antes, con este puedo
// añadirle "interceptores", modularizar endpoints, etc
// Directorio Publico
app.use(express_1.default.static("public"));
// Lectura y parseo del body, sin esto, no puedo acceder al body
app.use(express_1.default.json());
// Rutas
app.use("/api/usuarios", UsuarioController_1.usuarioController);
app.use("/api/eventos", EventosController_1.eventosController);
// escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});
