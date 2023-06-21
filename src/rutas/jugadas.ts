import { Request, Response } from 'express'
import { CrearJugada, ObtenerJugadas } from '../manejadores/jugadas'

export const RutaObtenerJugadas = async (req: Request, res: Response) => {
  try {
    const jugadas = await ObtenerJugadas()
    res.status(200).json(jugadas)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaCrearJugada = async (req: Request, res: Response) => {
  try {
		if (!req.body) {
			res.sendStatus(400)
			return
    }
    const jugadas = await CrearJugada(req.body)
    res.status(200).json(jugadas)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
