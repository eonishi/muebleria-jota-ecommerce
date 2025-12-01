import { PedidosModel } from "../models/mongo/pedidos.js"
import { AppError } from "../errors/error.js"


export class PedidosController {
  static async create(req, res) {
    const pedido = { ...req.body, user: req.user.id }
    if (!pedido.products) { throw new AppError("Debes pedir al menos un producto", 400) }

    const newPedido = await PedidosModel.create(pedido)
    if (!newPedido) { throw new AppError("No se pudo crear el pedido, intente nuevamente", 400) }

    return res.status(200).json(newPedido)
  }

  static async getAllByUser(req, res) {
    const query = { user: req.user.id }
    const pedidos = await PedidosModel.getAll(query)
    if (pedidos.length === 0) { throw new AppError("No se encontraron pedidos", 404) }

    return res.status(200).json(pedidos)
  }

  static async getAll(req, res) {
    const pedidos = await PedidosModel.getAll({ user: {} })
    if (!pedidos) { throw new AppError("No tenes ningún pedido", 404) }

    return res.status(200).json(pedidos)
  }

  static async update(req, res) {
    const { id } = req.params
    const { state, products } = req.body

    const newPedido = { id: id, state: state, products: products }
    if (!id) { throw new AppError("El pedido es necesario", 400) }

    const updatedPedido = await PedidosModel.update(newPedido)
    if (!updatedPedido) { throw new AppError("Pedido no encontrado", 404) }

    return res.status(200).json(updatedPedido)
  }
}
