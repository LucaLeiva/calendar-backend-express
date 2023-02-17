import express, { Express, Request, Response } from "express";
import { dbConnection } from "./database/config"

const cors = require("cors");
require("dotenv").config(); // con esto importo las variables de entorno

// crear el servidor de expres
const app: Express = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// use() es un middleware, que se ejecutara siempre antes, con este puedo
// añadirle "interceptores", modularizar endpoints, etc
// Directorio Publico
app.use(express.static("public"));

// Lectura y parseo del body, sin esto, no puedo acceder al body
app.use(express.json());

// Rutas
app.use("/api/usuarios", require("./controller/UsuarioController"));
// TODO: EVENTOS crud

// escuchar las peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}`);
});