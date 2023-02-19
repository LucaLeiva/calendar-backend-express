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
exports.eliminarEvento = exports.actualizarEvento = exports.crearEvento = exports.obtenerEventos = void 0;
const EventoEntity_1 = require("../models/EventoEntity");
// TODO ver como se puede paginar esto
const obtenerEventos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const eventos = yield EventoEntity_1.EventoEntity.find()
        .populate("usuario", "nombre email");
    response.json({
        ok: true,
        eventos: eventos
    });
});
exports.obtenerEventos = obtenerEventos;
const crearEvento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = new EventoEntity_1.EventoEntity(request.body);
    try {
        evento.usuario = request.body.uid;
        const eventoGuardado = yield evento.save();
        response.json({
            ok: true,
            evento: eventoGuardado
        });
    }
    catch (error) {
        console.log(error);
        response.status(500)
            .json({
            ok: false,
            mensaje: "Error al grabar"
        });
    }
});
exports.crearEvento = crearEvento;
const actualizarEvento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoId = request.params.id;
    try {
        const evento = yield EventoEntity_1.EventoEntity.findById(eventoId);
        const uid = request.body.uid;
        if (!evento) {
            return response.status(404)
                .json({
                ok: false,
                mensaje: "No existe el vento con ese id"
            });
        }
        if (evento.usuario.toString() !== uid) {
            return response.status(401)
                .json({
                ok: false,
                mensaje: "No tiene permisos para editar este evento"
            });
        }
        delete request.body.usuario;
        delete request.body.uid;
        const nuevoEvento = Object.assign(Object.assign({}, request.body), { usuario: uid });
        const eventoActualizado = yield EventoEntity_1.EventoEntity.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        response.json({
            ok: true,
            evento: eventoActualizado
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
exports.actualizarEvento = actualizarEvento;
const eliminarEvento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoId = request.params.id;
    try {
        const evento = yield EventoEntity_1.EventoEntity.findById(eventoId);
        const uid = request.body.uid;
        if (!evento) {
            return response.status(404)
                .json({
                ok: false,
                mensaje: "No existe el evento con ese id"
            });
        }
        if (evento.usuario.toString() !== uid) {
            return response.status(401)
                .json({
                ok: false,
                mensaje: "No tiene permisos para editar este evento"
            });
        }
        yield EventoEntity_1.EventoEntity.findByIdAndDelete(eventoId);
        return response.status(204).end();
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
exports.eliminarEvento = eliminarEvento;
