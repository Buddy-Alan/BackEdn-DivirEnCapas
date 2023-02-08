import { getAllUser } from "../services/user.service.js"
import rutaGet from "../../js/rutaGet.js"
import rutaPost from "../../js/rutaPost.js"

export const getAllUserController = async (req, res) => {
    const allUser = await getAllUser()
    res.json({ usuarios: allUser })
}

export const getLogoutController = async (req, res) => {
    if (req.isAuthenticated()) {
        res.render("logout", { nombreUsuario: req.user.name })
        rutaGet(req.path)
    }
    else {
        res.redirect("/login")
    }
}

export const getLoginController = async (req, res) => {
    if (!req.isAuthenticated()) {
        const errorMensaje = req.session.messages ? req.session.messages[0] : ""
        res.render("formLogin", { error: errorMensaje })
        req.session.messages = [];
        rutaGet(req.path)

    } else {
        res.redirect("/")
    }
}

export const getRegisterController = async (req, res) => {
    if (!req.isAuthenticated()) {
        const errorMensaje = req.session.messages ? req.session.messages[0] : ""
        res.render('formRegister', { error: errorMensaje })
        req.session.messages = [];
        rutaGet(req.path)
    } else {
        res.redirect("/")
    }
}

export const postLogOut = async (req, res) => {
    rutaPost(req.path)
    req.session.destroy()
}

export const postLogin = (req, res) => {
    res.redirect("/")
}

export const postRegister = (req, res) => {
    rutaPost(req.path)
    res.redirect("/")

}
