import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import { __dirname } from './utilis.js'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const httpServer = app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080')
})


export const socketServer = new Server(httpServer)

let mensajes = []

socketServer.on('connection',(socket)=>{

    console.log('usuario conectado', socket.id)

    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })
    socket.on('nuevoUsuario', usuario=>{
        socket.broadcast.emit('broadcast',usuario)
    })
    socket.on('mensaje', info=>{
        mensajes.push(info)
        socketServer.emit('chat', mensajes)
    })
})


//minut 58