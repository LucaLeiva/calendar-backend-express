import { Schema, model } from "mongoose";

const UsuarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

export const UsuarioEntity = model("Usuario", UsuarioSchema);