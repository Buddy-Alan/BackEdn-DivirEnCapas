import { fork } from "child_process";
import { Router } from "express";
const random = Router()


random.get("/api/randoms", async (req, res) => {
    try {
        //  const child = fork('./child/child.js')
        let cantidadDeDatos = req.query.cant
        if (cantidadDeDatos == undefined || isNaN(cantidadDeDatos) || cantidadDeDatos == "") {
            cantidadDeDatos = 1
        }
        child.on("message", (childMsg) => {
            if (childMsg === "Listo") {
                child.send(cantidadDeDatos)
            } else {
                res.json({ resultado: childMsg })
            }
        })

    } catch (error) {
        console.log(error)
    }
}

)
export default random