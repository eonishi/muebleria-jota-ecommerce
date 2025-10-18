import { Router } from 'express'
import { ProductosController } from '../controllers/productos.js'
import { imageUploader } from '../middleware/imageUploader.js'

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/:id', ProductosController.getById)
productosRouter.post('/', imageUploader.single('imagen'), ProductosController.create)
productosRouter.put('/:id', ProductosController.update)
productosRouter.delete('/:id', ProductosController.delete)
