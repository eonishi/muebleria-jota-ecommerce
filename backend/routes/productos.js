import { Router } from 'express'
import { ProductosController } from '../controllers/productos.js'
import { handlerImageUploader } from '../middleware/imageUploader.js'

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/:id', ProductosController.getById)
productosRouter.post('/', handlerImageUploader, ProductosController.create)
productosRouter.put('/:id', handlerImageUploader, ProductosController.update)
productosRouter.delete('/:id', ProductosController.delete)
