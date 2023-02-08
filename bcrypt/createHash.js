import bcrypt from "bcrypt"


export const createHash = (pass) => {
    const hash = bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
    return (hash)
}

export const compareHash = (pass, passBD) => {
    return (bcrypt.compareSync(pass, passBD))
}