import { UserManager } from "../persistence/index.persistence.js";

export const getUserDB = (idUser, accion) => {
    return UserManager.getUserById(idUser, accion)
}

export const createUserDB = (email, nombre, password, accion) => {
    return UserManager.createUser(email, nombre, password, accion)
}

export const findOneUserDB = (userName, password, accion) => {
    UserManager.findOneUser(userName, password, accion)
}

export const getAllUser = async () => {
    return await UserManager.getAll()
}