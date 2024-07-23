import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors,{ CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from './config/swagger'
import { col } from 'sequelize'

// conectar a bd
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta('coneccion exitosa'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD'))
    }
}
connectDB()

// instancia de axios express

const server = express()

// permitir conexiones

const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if( origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
        optionsSuccessStatus: 200
    }
}

server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec,swaggerUIOptions) )

export default server