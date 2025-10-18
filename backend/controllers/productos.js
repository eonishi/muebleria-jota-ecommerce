import { ca } from 'zod/locales'
import { ProductosModel } from '../models/mongo/productos.js'

export class ProductosController {
  static async getAll(req, res) {
      const productos = await ProductosModel.getAll()
      res.json(productos)
  }

  static async getById (req, res) {
    const { id } = req.params
    const producto = await ProductosModel.getById({ id })
    if (producto) return res.json(producto)
    res.status(404).json({ error: 'Producto no encontrado' })
  }

  static async create(req, res) {
    const imageName = req.file?.filename || null // esto es para que guarde el nombre de la imagen
    const producto = {...req.body, imagen: imageName }
    try {
      const newProducto = await ProductosModel.create(producto)
      res.status(201).json(newProducto)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  static async update(req, res) {
    const { id } = req.params
    const producto = req.body
    try {
      const updatedProducto = await ProductosModel.update({ id, producto })
      res.status(200).json(updatedProducto)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      await ProductosModel.delete({ id })
      res.status(204).send()
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }
}
