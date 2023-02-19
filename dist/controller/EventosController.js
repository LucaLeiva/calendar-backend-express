"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventosController = void 0;
const express_1 = require("express");
const validarJwt_1 = require("../middlewares/validarJwt");
const EventosService_1 = require("../service/EventosService");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
/*
  Rutas de Eventos
  host + /api/eventos
*/
exports.eventosController = (0, express_1.Router)();
// Middleware de validacion, puedo poner en cada metodo los middlewares
// necesarios, o bien ponerlo en un use() y afecta a todos, o bien podria
// poner el use despues del post(), entonces solo la actualizacion y el
// borrado serian afectados por el middleware
exports.eventosController.use(validarJwt_1.validarJWT);
exports.eventosController.get("/", EventosService_1.obtenerEventos);
exports.eventosController.post("/", [
    (0, express_validator_1.check)("titulo", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("inicio", "La fecha de inicio es obligatoria").isDate(),
    (0, express_validator_1.check)("fin", "La fecha de fin es obligatoria").isDate(),
    validarCampos_1.validarCampos
], EventosService_1.crearEvento);
exports.eventosController.put("/:id", EventosService_1.actualizarEvento);
exports.eventosController.delete("/:id", EventosService_1.eliminarEvento);
