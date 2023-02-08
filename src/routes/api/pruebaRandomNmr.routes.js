import { Router } from "express";
const prueba = Router()
import rutaGet from "../../js/rutaGet.js";
import rutaPost from "../../js/rutaPost.js";

prueba.get("/api/randoms/prueba", (req, res) => {
    let cantidadDeDatos = req.query.cant
    if (cantidadDeDatos == undefined || isNaN(cantidadDeDatos) || cantidadDeDatos == "") {
        cantidadDeDatos = 100
    }

    const arrayNumero = []
    for (let index = 0; index < cantidadDeDatos; index++) {
        const numeroAEncontrar = Math.floor(Math.random() * (10 - 1 + 1) + 1)
        const index = arrayNumero.findIndex(e => e[numeroAEncontrar])
        if (index > -1) {
            arrayNumero[index][numeroAEncontrar]++
        } else {
            let nuevoNumero = {}
            nuevoNumero[numeroAEncontrar] = 1
            arrayNumero.push(nuevoNumero)
        }
    }

    res.json({ resultado: arrayNumero })

    rutaGet(req.path)

})
export default prueba