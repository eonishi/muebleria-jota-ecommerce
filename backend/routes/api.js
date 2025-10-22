import { Router, json } from "express"
import { productosRouter } from "./productos.js"
import responseCache from "../middleware/responseCache.js"
import { AppError } from "../errors/error.js"

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(responseCache)

// Rutas disponibles en la api
apiRouter.use("/productos", productosRouter)

// Rutas no encontradas dentro de /api
apiRouter.use("/{*splat}", (req, res, next) => {
	const err = new AppError("Ruta no encontrada", 404)
	next(err)
})
