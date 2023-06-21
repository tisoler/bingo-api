import ConexionBaseDatos from './db'

export interface JugadaDB {
  id?: number,
  codigo: string,
  fecha?: string,
  idColor: number,
  activo?: boolean,
}

export const ObtenerJugadasBD = async (): Promise<JugadaDB[]> => {
  return new Promise((resolve, reject) => {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')

    poolConexion.query(`
			SELECT *
			FROM jugadas
		`, (error: any, cartones: any)=> {
      if (error){
        console.log(error)
        return reject(`Error obteniendos jugadas`)
      }

			return resolve(cartones)
		})
  })
}

export const InsertarJugadaBD = async (jugada: JugadaDB): Promise<JugadaDB> => {
	return new Promise((resolve, reject)=> {
		const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
		if (!poolConexion) return reject('No hay conexión a la base de datos')
		if (!jugada) return reject('No hay jugada para insertar.')

		poolConexion.query(`
			INSERT INTO jugadas (codigo, idColor)
			VALUES ('${jugada.codigo}', ${jugada.idColor})
		`, (error: any, resultado: any)=> {
			if (error){
				console.log(error)
				return reject(`Error insertando jugada`)
			}

			return resolve(resultado)
		})
	})
}
