import { Schema, model } from "mongoose";


const EventoSchema: Schema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  notas: {
    type: String
  },
  inicio: {
    type: Date,
    required: true
  },
  fin: {
    type: Date,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
});

// cambio la fomra en que se serializa el objeto, para cambiar _id por id
// e ignorar el __v
EventoSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  return object;
})

export const EventoEntity = model("Evento", EventoSchema);