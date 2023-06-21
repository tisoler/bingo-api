import { Request, Response } from 'express'
import { GenerarCartonesParaJugada, ObtenerCartonesParaJugada } from '../manejadores/cartones'

export const RutaObtenerCartonesParaJugada = async (req: Request, res: Response) => {
  try {
    if (!req.params?.idJugada || isNaN(Number(req.params.idJugada))) {
			res.sendStatus(400)
			return
    }
    const cartones = await ObtenerCartonesParaJugada(parseInt(req.params?.idJugada))
    res.status(200).json(cartones)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export const RutaGenerarCartonesParaJugada = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.params?.idJugada || isNaN(Number(req.params.idJugada))) {
			res.sendStatus(400)
			return
    }
    const cartones = await GenerarCartonesParaJugada(parseInt(req.params?.idJugada), req.body)
    res.status(200).json(cartones)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
