import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Model } from "mongoose";
import { UsuarioEntity } from "../models/UsuarioEntity";
import { generarJWT } from "../helpers/jwt";

const bcrypt = require("bcryptjs");


const crearUsuario = async(request: Request, response: Response) => {
  
  const { email, contraseña } = request.body;

  try {

    let usuario = await UsuarioEntity.findOne({ email, contraseña});

    if (usuario) {
      return response.status(409).json({
        ok: false,
        mensaje: "Ya existe un usuario con ese correo"
      })
    }

    usuario = new UsuarioEntity(request.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);

    await usuario.save();

    // generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    return response
      .status(201)
      .json({
        ok: true,
        uid: usuario.id,
        nombre: usuario.nombre,
        token: token
      });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        ok: false,
        mensaje: "Error del sistema"
      })
  }
}

const loginUsuario = async(request: Request, response: Response) => {
  
  const { email, contraseña } = request.body;
  
  try {

    let usuario = await UsuarioEntity.findOne({ email });

    if (!usuario) {
      return response.status(400)
        .json({
          ok: false,
          mensaje: "El usuario y contraseña no existe"
        });
    }

    // comparar contraseñas
    if (!bcrypt.compareSync(contraseña, usuario.contraseña)) {
      return response.status(400)
        .json({
          ok: false,
          mensaje: "Contraseña incorrecta"
        })
    }

    // generar JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    return response.json({
      ok: true,
      uid: usuario.id,
      nombre: usuario.nombre,
      token: token
    });

  } catch (error) {
    console.log(error);
    response.status(500)
      .json({
        ok: false,
        mensaje: "Error del sistema"
      })
  }
}

const renovarToken = async(request: Request, response: Response) => {
  
  const uid = request.body.uid;
  const nombre = request.body.nombre;

  // Generar JWT
  const token = await generarJWT(uid, nombre);
  
  return response.json({
    ok: true,
    uid: uid,
    nombre: nombre,
    token: token
  });
}

module.exports = {
  crearUsuario,
  loginUsuario,
  renovarToken
};