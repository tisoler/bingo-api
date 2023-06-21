import ConexionBaseDatos from './db'

export interface CartonDB {
  id?: number,
  numeroSerie: number,
  idJugada: number,
  comprador?: string,
  ganadorLinea?: boolean,
  ganadorBingo?: boolean,
  numeros: string,
}

export interface PayloadCartonesParaJugada {
	limiteMaximo?: number,
}

export const ObtenerCartonesParaJugadaBD = async (idJugada: number): Promise<CartonDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
			SELECT *
			FROM cartones
			WHERE idJugada = ${idJugada}
			ORDER BY numeroSerie
		`, (error: any, cartones: any)=> {
      if (error){
        console.log(error)
        return reject(`Error obteniendos cartones para jugada ${idJugada}`)
      }

			return resolve(cartones)
		})
  })
}

export const InsertarCartonesBD = async (cartones: CartonDB[]): Promise<CartonDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
		if (!cartones.length) return reject('No hay cartones para insertar.')

		const valores = cartones.map(
			carton => `(${carton.numeroSerie}, ${carton.idJugada}, '${carton.comprador ?? ''}', ${!!carton.ganadorLinea}, ${!!carton.ganadorBingo}, '${carton.numeros}')`
		)

    poolConexion.query(`
			INSERT INTO cartones (numeroSerie, idJugada, comprador, ganadorLinea, ganadorBingo, numeros)
			VALUES ${valores}
		`, (error: any, resultado: any)=> {
      if (error){
        console.log(error)
        return reject(`Error insertando cartones`)
      }

			return resolve(cartones)
		})
  })
}
