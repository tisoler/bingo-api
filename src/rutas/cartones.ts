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
    if (!req.params?.idJugada || isNaN(Number(req.params.idJugada))) {
			res.sendStatus(400)
			return
    }
		const limiteMaximo = parseInt(req.params?.limiteMaximo ?? 5000)
    const cartones = await GenerarCartonesParaJugada(parseInt(req.params?.idJugada), limiteMaximo)
    res.status(200).json(cartones)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
