import express from "express";
const router = express.Router()
import login from "./api/login.routes.js";
import productRouter from "./api/rutasProductos.routes.js";
import random from "./api/randomNmr.routes.js";
import info from "./api/info.routes.js";

router.use("/", login);
router.use("/", productRouter);
router.use("/", info)
router.use("/", random)

export { router as apiRouter }