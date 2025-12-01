import { PedidosSchema } from "./schemas/Pedidos.js";
import { ProductosModel } from "./productos.js";
import { model } from "mongoose";
import { applyDiscount } from "../../utils/discount.js";
import { AppError } from "../../errors/error.js";
import { isValidMongoId, throwMongooseError, throwValidateMongoError } from "./utils/errors.js";

const Pedido = model("Pedido", PedidosSchema)
export class PedidosModel {
  static async create(pedido) {
    // TODO: Validar stock y actualizarlo
    // Actualmente existe el stock por producto y el frontend "limita" la cantidad por producto al stock,
    // pero es NECESARIO validar la cantidad de la req con el stock real de la db y actualizarlo en caso de compra.

    // Calculo del total
    const productosIds = Array.from(pedido.products, (p) => { return p.product })
    const precioPorProducto = await ProductosModel.getByIds(productosIds)
    const totalAPagar = precioPorProducto.reduce((acc, p) => {
      return acc + applyDiscount(p.price, p.discount)
    }, 0)

    const newPedido = new Pedido({
      user: pedido.user,
      products: pedido.products,
      total: totalAPagar,
    })

    const err = newPedido.validateSync()
    throwValidateMongoError(err)

    return await newPedido.save()
  }

  static async getAll({ user }) {
    const pedidos = await Pedido
      .find({ user: user }, "-user")
      .populate({
        path: "products.product",
        select: "product_name",
      })

    return pedidos
  }

  static async update(pedido) {
    if (!isValidMongoId(pedido.id)) {
      return null
    }
    const pedidoToUpdate = await Pedido.findById(pedido.id, "state products")

    if (!pedidoToUpdate) { return null }
    // (Depende de la logica de negocio. Puede cambiar) Si el pedido ya fue "aceptado" y se comenzó su proceso de fabricación YA NO PUEDE SER MODIFICADO/CANCELADO
    // Estoy empezando a pasear los valores del enum:state por la logica de negocio
    // TODO: separar el enum del state en una constate externa y consumirla desde esa constante.
    if (pedidoToUpdate.state !== "pendiente") { throw new AppError("El pedido ya no puede ser modificado.", 400) }

    const updatePayload = {
      $set: {
        state: pedido.state ? pedido.state : pedidoToUpdate.state,
        products: pedido.products ? pedido.products : pedidoToUpdate.products,
      }
    }
    const updateOptions = { runValidators: true, new: true, context: "query" }

    try {
      return await Pedido.findByIdAndUpdate(pedido.id, updatePayload, updateOptions)
    } catch (err) {
      throwMongooseError(err)
    }
  }

}

