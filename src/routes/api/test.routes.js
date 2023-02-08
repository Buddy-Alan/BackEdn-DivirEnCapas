import { faker } from "@faker-js/faker"
import { Router } from "express"
const { commerce, image } = faker
const ruta = Router();
import rutaGet from "../../js/rutaGet.js";
import rutaPost from "../../js/rutaPost.js";

ruta.get("/", (req, res) => {

    let arrayProd = [];
    for (let i = 0; i < 5; i++) {
        arrayProd.push(
            {
                title: commerce.product(),
                price: commerce.price(100, 10000, 0),
                url: image.imageUrl()
            }
        )

    }


    res.json(arrayProd)

})

export const productTest = ruta