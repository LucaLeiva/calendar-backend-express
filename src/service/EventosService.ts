import { Request, Response } from "express";
import { EventoEntity } from "../models/EventoEntity";


// TODO ver como se puede paginar esto
export const obtenerEventos = async(request: Request, response: Response) => {
  
  const eventos = await EventoEntity.find()
                                    .populate("usuario", "nombre email");
  
  response.json({
    ok: true,
    eventos: eventos
  });
}

export const crearEvento = async(request: Request, response: Response) => {
  
  const evento = new EventoEntity(request.body);

  try {

    evento.usuario = request.body.uid;
    const eventoGuardado = await evento.save();

    response.json({
      ok: true,
      evento: eventoGuardado
    })

  } catch (error) {
    console.log(error);
    response.status(500)
      .json({
        ok: false,
        mensaje: "Error al grabar"
      });
  }
}

export const actualizarEvento = async(request: Request, response: Response) => {
  
  const eventoId: String = request.params.id;
  
  try {

    const evento = await EventoEntity.findById(eventoId);
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
        })
    }

    delete request.body.usuario;
    delete request.body.uid;
  
    const nuevoEvento = {
      ...request.body,
      usuario: uid
    }

    const eventoActualizado = await EventoEntity.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

    response.json({
      ok: true,
      evento: eventoActualizado
    })

  } catch (error) {
    console.log(error);
    response.status(500)
      .json({
        ok: false,
        mensaje: "Error del sistema"
      })
  }
}

export const eliminarEvento = async(request: Request, response: Response) => {
  
  const eventoId: String = request.params.id;
  
  try {

    const evento = await EventoEntity.findById(eventoId);
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
          mensaje: "No tiene permisos para eliminar este evento"
        })
    }

    await EventoEntity.findByIdAndDelete(eventoId);

    return response.status(204).end();

  } catch (error) {
    console.log(error);
    response.status(500)
      .json({
        ok: false,
        mensaje: "Error del sistema"
      })
  }
}