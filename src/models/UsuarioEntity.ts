import { Schema, model } from "mongoose";

const UsuarioSchema: Schema = new Schema({
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

export const UsuarioEntity = model("Usuario", UsuarioSchema);