import { Router, json } from "express"
import { productosRouter } from "./productos.js"

export const apiRouter = Router()

apiRouter.use(json())

// Rutas disponibles en la api
apiRouter.use("/productos", productosRouter)

// Rutas no encontradas dentro de /api
apiRouter.use((req, res) => {
	res.status(404).json({ error: "Not Found" })
})
