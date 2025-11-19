import { Router} from "express"
import { productosRouter } from "./productos.js"
import { authRouter } from "./auth.js"
import responseCache from "../middleware/responseCache.js"
import { handleJSON } from "../middleware/handleJSON.js"
import { AppError } from "../errors/error.js"

export const apiRouter = Router()


apiRouter.use(handleJSON)
apiRouter.use(responseCache)

// Rutas disponibles en la api
apiRouter.use("/productos", productosRouter)
apiRouter.use("/auth", authRouter)

// Rutas no encontradas dentro de /api
apiRouter.use("/{*splat}", (req, res, next) => {
	const err = new AppError("Ruta no encontrada", 404)
	next(err)
})
