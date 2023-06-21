import { ColorDB, ObtenerColoresBD } from '../baseDatos/colores'

export const ObtenerColores = async (): Promise<ColorDB[]> => {
  const colores: ColorDB[] = await ObtenerColoresBD()
  if (!colores?.length) {
    console.log(`No hay colores cargadas.`)
    return []
  }

  return colores
}
