import express, { Express, Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { RutaGenerarCartonesParaJugada, RutaObtenerCartonesParaJugada } from './rutas/cartones'
import { RutaCrearJugada, RutaObtenerJugadas } from './rutas/jugadas'
import { RutaObtenerColores } from './rutas/colores'

dotenv.config()

const { FRONTEND_URL, API_PORT } = process.env

// Creación de servidor
const app: Express = express()
app.use(express.json())

const corsOptions = {
	origin: [FRONTEND_URL, 'http://localhost:3000'],
	optionsSuccessStatus: 200
}

// @ts-ignore
app.use(cors(corsOptions))

const apiRouter: Router = express.Router()
apiRouter.get('/cartonesJugada/:idJugada', RutaObtenerCartonesParaJugada)
apiRouter.post('/cartonesJugada/:idJugada', RutaGenerarCartonesParaJugada)
apiRouter.get('/jugadas', RutaObtenerJugadas)
apiRouter.post('/jugadas', RutaCrearJugada)
apiRouter.get('/colores', RutaObtenerColores)
app.use(apiRouter)

const port = API_PORT || 3013
app.listen(port, () => {
  console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`)
})
