import { Request, Response } from 'express'
import { ObtenerColores } from '../manejadores/colores'

export const RutaObtenerColores = async (req: Request, res: Response) => {
  try {
    const colores = await ObtenerColores()
    res.status(200).json(colores)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
