import { Router } from 'express'
import { ProductosController } from '../controllers/productos.js'

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/:id', ProductosController.getById)
