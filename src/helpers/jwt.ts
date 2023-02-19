const jwt = require("jsonwebtoken");


export const generarJWT = (uid: String , nombre: String) => {
  
  return new Promise((resolve, reject) => {
    const payload = { uid, nombre }

    jwt.sign(payload, "Esto-Es-UnA-Palbr@_SecretA12341267", {
      expiresIn: "24h"
    }, (error: any, token: any) => {
      if (error) {
        console.log(error);
        reject("No se pudo generar el token");
      }

      resolve(token);
    })
  })
}