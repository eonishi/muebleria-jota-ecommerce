import { ProductosModel } from '../models/mongo/productos.js'
import { AppError } from '../errors/error.js'

export class ProductosController {
  static async getAll(req, res, next) {
    const productos = await ProductosModel.getAll()
    return res.json(productos)
  }

  static async getById (req, res) {
    const { id } = req.params
    const producto = await ProductosModel.getById({ id })
    if (!producto) {
      throw new AppError('Producto no encontrado', 404)
    }
    return res.json(producto)
  }

  static async create(req, res) {
    const imageName = req.file?.filename || null // esto es para que guarde el nombre de la imagen
    const producto = { ...req.body, imagen: imageName }

    const newProducto = await ProductosModel.create(producto)    
    return res.status(201).json(newProducto)
  }

  static async update(req, res) {
    const { id } = req.params
    const producto = req.body

    const updatedProducto = await ProductosModel.update({ id, producto })

    if (!updatedProducto)
      throw new AppError('Producto no encontrado', 404)

    res.status(200).json(updatedProducto)
  }

  static async delete(req, res) {
    const { id } = req.params
    const deletedProduct = await ProductosModel.delete({ id })
    if (!deletedProduct)
      throw new AppError('Producto no encontrado', 404)
    res.status(204).send()
  }
}
