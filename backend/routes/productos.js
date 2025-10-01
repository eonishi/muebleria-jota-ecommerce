import { Router } from 'express'
import { ProductosController } from '../controllers/productos.js'

export const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll)
productosRouter.get('/:id', ProductosController.getById)

productosRouter.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
