import ConexionBaseDatos from './db'

export interface ColorDB {
  id?: number,
  nombre: string,
}

export const ObtenerColoresBD = async (): Promise<ColorDB[]> => {
	return new Promise((resolve, reject) => {
		const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
		if (!poolConexion) return reject('No hay conexión a la base de datos')

		poolConexion.query(`
			SELECT *
			FROM colores
		`, (error: any, colores: any)=> {
			if (error){
				console.log(error)
				return reject(`Error obteniendos colores`)
			}

			return resolve(colores)
		})
	})
}
