import { Router } from "express";
import { validarJWT } from "../middlewares/validarJwt";
import { crearEvento, actualizarEvento, obtenerEventos, eliminarEvento } from "../service/EventosService";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";


/*
  Rutas de Eventos
  host + /api/eventos
*/

export const eventosController: Router = Router();

// Middleware de validacion, puedo poner en cada metodo los middlewares
// necesarios, o bien ponerlo en un use() y afecta a todos, o bien podria
// poner el use despues del post(), entonces solo la actualizacion y el
// borrado serian afectados por el middleware
eventosController.use(validarJWT);

eventosController.get("/", obtenerEventos);
eventosController.post("/",
  [
    check("titulo", "El titulo es obligatorio").not().isEmpty(),
    check("inicio", "La fecha de inicio es obligatoria").isDate(),
    check("fin", "La fecha de fin es obligatoria").isDate(),
    validarCampos
  ],
  crearEvento);
eventosController.put("/:id", actualizarEvento);
eventosController.delete("/:id", eliminarEvento);