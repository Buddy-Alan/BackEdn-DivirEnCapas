import * as dotenv from "dotenv"

//Configuramos Dotenv
dotenv.config({
    path: ".env.development"
})

export const config = {
    BDusuarios: process.env.BaseDeDatosUsuarios || "",
    BDSesiones: process.env.BaseDeDatosSesiones || "",
    claveSesion: process.env.Clave_Sesion,
    Modo: process.env.MODO
}