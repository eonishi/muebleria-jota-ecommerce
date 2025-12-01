import { Router } from "express"
import { productosRouter } from "./productos.js"
import { pedidosRouter } from "./pedidos.js"
import { authRouter } from "./auth.js"
import responseCache from "../middleware/responseCache.js"
import { handleJSON } from "../middleware/handleJSON.js"
import cookieParser from 'cookie-parser'
import { AppError } from "../errors/error.js"

export const apiRouter = Router()


apiRouter.use(handleJSON)
apiRouter.use(responseCache)
apiRouter.use(cookieParser())

// Rutas disponibles en la api
apiRouter.use("/productos", productosRouter)
apiRouter.use("/auth", authRouter)
apiRouter.use("/pedidos", pedidosRouter)

// Rutas no encontradas dentro de /api
apiRouter.use("/{*splat}", (req, res, next) => {
  const err = new AppError("Ruta no encontrada", 404)
  next(err)
})
