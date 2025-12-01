import { AppError } from "../errors/error"
import { verifyToken } from "../utils/index.js"

export function tokenAuthentication(req, res, next) {
	const authHeader = req.headers["authorization"]
	if (!authHeader)
		throw new AppError("No se proporcionó ningun Token", 401)

	// TODO: revisar si hay un método que extraiga un valor del header en concreto
	const token = authHeader.split(" ")[1]
	if (!token)
		throw new AppError("Token malformado", 401)

	try {
		const decodedData = verifyToken(token)
		// asigno la data a un campo de la request
		// para que sea usanda en la "siguiente etapa" de procesamiento de la petición
		req.user = decodedData
		next()
	} catch (err) {
		throw new AppError("Token invalido o expirado", 401)
	}
}
