import { Router } from 'express'
import { ProductosController } from '../controllers/productos.js'
import { handlerImageUploader } from '../middleware/imageUploader.js'
import { permission } from "../middleware/permission.js"

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/:id', ProductosController.getById)
productosRouter.post('/', permission('admin'), handlerImageUploader, ProductosController.create)
productosRouter.put('/:id', permission('admin'), handlerImageUploader, ProductosController.update)
productosRouter.delete('/:id', permission('admin'), ProductosController.delete)
