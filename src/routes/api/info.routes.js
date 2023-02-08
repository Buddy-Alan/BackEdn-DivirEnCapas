import { Router } from "express";
import compression from "compression";
import rutaGet from "../../../js/rutaGet.js";


const info = Router()



info.get("/info", compression(), (req, res) => {

    res.json({
        "Argumentos de entrada": process.argv,
        "S.O.": process.platform,
        "Version de NODE": process.version,
        "Memoria total Reservada": process.memoryUsage().rss,
        "Path de ejecucion": process.execPath,
        "Process ID": process.pid,
        "Ubicacion del proyecto": process.env.INIT_CWD,
        "Datos para sumar peso": process.env
    })
    rutaGet(req.path)
})


export default info
