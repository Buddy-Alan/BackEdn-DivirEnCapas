import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { contenedorDaoChat } from "./daos/index.js";
import { normalize, schema } from "normalizr";
import { conectMongo } from "./conect/mongo.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { config } from "./src/config/configDotenv.js"
import parsedArgs from "minimist";
import { logger } from "./logger.js";
import { UserManager } from "./src/persistence/index.persistence.js";
import { apiRouter } from "./src/routes/index.js";
import { getUserDB, createUserDB, findOneUserDB } from "./src/services/user.service.js"




const objtArguments = parsedArgs(process.argv.slice(2))
// const PORT = objtArguments.PORT && objtArguments.PORT != true ? objtArguments.PORT : 8080
const puerto = process.env.PORT || 8080;
//URL Mongo Atlas
const url = "mongodb://127.0.0.1:27017/chatMongo"//URL local
const usuariosDB = config.BDusuarios
conectMongo(usuariosDB)
const sessionsDB = config.BDSesiones
const claseChats = contenedorDaoChat
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();



const server = app.listen(puerto, () => {
    console.log(`server on port ${puerto} en el modo, ${config.Modo}, en el proceso ${process.pid}`)
})



const io = new Server(server)
//Schema normalizr

//schema para author
const authorEsquema = new schema.Entity("authors", {}, { idAttribute: "email" })
//Schema para mensajes
const schemaMessage = new schema.Entity("messages", { author: authorEsquema })
//Schema global
const schemaGlobal = new schema.Entity("globalChat", {
    messages: [schemaMessage]
}, { idAttribute: "id" })

//Funcion para normalizar datos
const dataNormalizer = (data) => {
    const normalizeData = normalize({ id: "chatHistory", messages: data }, schemaGlobal)
    return normalizeData
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", engine());
app.set("views", "./src/views")
app.set("view engine", "handlebars")

//Crea Cookiess
app.use(cookieParser())
//Guarda las sesiones de las cookiess en mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: sessionsDB,
        ttl: 600
    }),
    secret: config.claveSesion,
    resave: false,
    saveUninitialized: false,
}))


//Configuramo passport
app.use(passport.initialize())//Conecta passport a express
app.use(passport.session())//Relaciona sesiones con usuario

//Serealizacion de usuarios
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//Deseralizar usuarios
passport.deserializeUser((id, done) => {
    getUserDB(id, done)
})
//Seralizacion de contraseñas:

//Se utiliza para guardar el usuario con passport
passport.use("singup", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    async (req, userName, password, done) => {
        try {
            const nombre = req.body.name
            createUserDB(userName, nombre, password, done)
        }
        catch (error) {
            logger.error(error)
        }
    }
))

//Funcion para comprar las contraseñas hasheadas

passport.use("login", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email"
    },
    async (req, userName, password, done) => {
        try {
            findOneUserDB(userName, password, done)
        } catch (error) {
            logger.error(error)
        }
    }
))

//Rutas
app.use("/", apiRouter)
app.use(express.static(__dirname + "/src/views/layouts"))
app.get("*", (req, res) => {
    logger.warn(`Se intento ingresar al a ruta ${req.path}`)
})





//Pasar el socket a un endpoint para hacer funcionar el chat y tomar los datos
//O usar passport para enviar el usuario asi funciona el chat

io.on("connection", async (socket) => {
    try {
        const chatNormalizer = await claseChats.obtenerMensajes()
        const historicoDelChat = dataNormalizer(chatNormalizer)
        // console.log(historicoDelChat)
        //     socket.on("envioProducto", async (datoRecibido) => {
        //         try {
        //             // await contenedorProducts.save(datoRecibido)
        //             // actualizarProductos = await contenedorProducts.getAll()
        //             socket.emit("todosLosProductos", actualizarProductos)
        //         } catch (error) {
        //             res.status(500).send("Hubo un error en el Servidor")
        //         }
        //     })
        socket.broadcast.emit("newUser", socket.id)
        if (historicoDelChat) {
            socket.emit("todosLosMensajes", historicoDelChat)
        }
        socket.on("envioMensajesFront", async (datoCliente) => {
            try {
                await claseChats.agregarMensaje(datoCliente)
                const chatNormalizer = await claseChats.obtenerMensajes()
                const allChats = dataNormalizer(chatNormalizer)
                io.sockets.emit("todosLosMensajes", allChats)
            } catch (error) {
                console.log(error)
            }
        })
        socket.on("envioUsuario", (usuario) => {
            // console.log(usuario)
        })
    } catch (error) {
        logger.error(`Se produjo un error en el chat, el error es: ${error}`)
    }
})

