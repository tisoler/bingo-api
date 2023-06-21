import { ObtenerCartonesParaJugadaBD, CartonDB, InsertarCartonesBD, PayloadCartonesParaJugada } from '../baseDatos/cartones'
import { ObtenerJugadasBD } from '../baseDatos/jugadas'

export const ObtenerCartonesParaJugada = async (idJugada: number): Promise<CartonDB[]> => {
  const cartones: CartonDB[] = await ObtenerCartonesParaJugadaBD(idJugada)
  if (!cartones?.length) {
    console.log(`No hay cartones para la jugada ${idJugada}.`)
    return []
  }

  return cartones
}

export const GenerarCartonesParaJugada = async (idJugada: number, payload: PayloadCartonesParaJugada): Promise<CartonDB[]> => {
	const jugadas = await ObtenerJugadasBD()
	if (!jugadas.length && !jugadas.some(j => j.id === idJugada)) throw Error(`No hay jugada con id: ${idJugada}`)

	const cartonesExistentes: CartonDB[] = await ObtenerCartonesParaJugadaBD(idJugada)
	let proximoNumeroSerie = cartonesExistentes?.length ? (cartonesExistentes.slice(-1)[0]?.numeroSerie ?? 0) + 1 : 1
	const nuevosCartones: CartonDB[] = []
	const limiteMaximo = payload.limiteMaximo ?? 5000

	// Generar los x cartones
	for (let i = 0; i < limiteMaximo; i++) {
		let decenasConUnNumero = 0
		let nuevoCarton: CartonDB = {
			idJugada,
			numeroSerie: proximoNumeroSerie,
			numeros: ""
		}
		const numeros: number[] = []

		// Generar los números por decena
		for (let j = 0; j < 9; j++) {
			// Hasta 3 columnas pueden tener solamente un número (mínimo), el resto debe tener 2 (máximo)
			const numerosParaDecena = decenasConUnNumero === 3
				? 2
				: Math.random() >= 0.5 ? 2 : 1
			
			if (numerosParaDecena === 1) decenasConUnNumero += 1

			for (let w = 0; w < numerosParaDecena; w++) {
				const max = j * 10 + 10
				const min = j * 10
				const numero = Math.round(Math.random() * (max - min) + min)
				// Si el número no está en el cartón lo agrego
				if (!numeros.some(n => n === numero)) numeros.push(numero)
			}
		}
		nuevoCarton.numeros = numeros.join(',')

		// Validar que no es cartón existente en la jugada
		const esCartonExistente = [...cartonesExistentes, ...nuevosCartones]
			.some(carton => carton.numeros.split(',').sort((a, b) => parseInt(a) - parseInt(b)).every((numero, indice) => parseInt(numero) === numeros[indice]))
	
		if (!esCartonExistente) {
			nuevosCartones.push(nuevoCarton)
			proximoNumeroSerie += 1
		}
	}

	await InsertarCartonesBD(nuevosCartones)

	return ObtenerCartonesParaJugada(idJugada)
}