import { Router } from "express";
import passport from "passport";


import rutaPost from "../../../js/rutaPost.js";
import * as controller from "../../controllers/login.controllers.js";
const login = Router()



login.get("/register", controller.getRegisterController)

login.post("/register", passport.authenticate("singup", {
    failureRedirect: "/register",
    failureMessage: true
}), controller.postRegister)

login.get("/login", controller.getLoginController)

login.post("/login", passport.authenticate("login", {
    failureRedirect: "/login",
    failureMessage: true
}), controller.postLogin)


login.get("/logout", controller.getLogoutController)

login.post("/logout", controller.postLogOut)

login.get("/allUser", controller.getAllUserController)

export default login
