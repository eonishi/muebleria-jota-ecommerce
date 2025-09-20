import { ProductosModel } from '../models/json/productos.js'

export class ProductosController {
  static async getAll (req, res) {
    const productos = await ProductosModel.getAll()
    res.json(productos)
  }

  static async getById (req, res) {
    const { id } = req.params
    const producto = await ProductosModel.getById({ id })
    if (producto) return res.json(producto)
    res.status(404).json({ error: 'Producto no encontrado' })
  }
}
