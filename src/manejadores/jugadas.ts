import { ObtenerJugadasBD, JugadaDB, InsertarJugadaBD } from '../baseDatos/jugadas'

export const ObtenerJugadas = async (): Promise<JugadaDB[]> => {
  const jugadas: JugadaDB[] = await ObtenerJugadasBD()
  if (!jugadas?.length) {
    console.log(`No hay jugadas cargadas.`)
    return []
  }

  return jugadas
}

export const CrearJugada = async (payload: JugadaDB): Promise<JugadaDB> => {
  const jugada: JugadaDB = await InsertarJugadaBD(payload)

  return jugada
}
