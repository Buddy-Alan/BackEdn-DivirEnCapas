process.send("Listo")

process.on("message", (parentMsg) => {

    const arrayNumero = []
    for (let index = 0; index < parentMsg; index++) {
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
    process.send(arrayNumero)


})