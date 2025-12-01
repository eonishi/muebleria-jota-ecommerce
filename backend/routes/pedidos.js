import { Router } from "express";
import { PedidosController } from "../controllers/pedidos.js"
import { permission } from "../middleware/permission.js";

export const pedidosRouter = Router()

pedidosRouter.post('/', permission('admin', 'user'), PedidosController.create)
pedidosRouter.get('/', permission('admin', 'user'), PedidosController.getAllByUser)
pedidosRouter.post('/:id', permission('admin', 'user'), PedidosController.update)

// Estaria bueno gestionarlo con queryParams
pedidosRouter.get('/all', permission('admin'), PedidosController.getAll)
