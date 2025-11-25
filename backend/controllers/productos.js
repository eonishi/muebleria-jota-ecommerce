import { ProductosModel } from "../models/mongo/productos.js"
import { AppError } from "../errors/error.js"
import { normalizeString, shuffle, deleteFile } from "../utils/index.js"
import { destination } from "../middleware/imageUploader.js" // mejor una variable de entorno(?)

export class ProductosController {
  static async getAll(req, res, next) {
    let productos = await ProductosModel.getAll()

    const { q, r } = req.query
    if (!q && !r) return res.json(productos)

    if (r) { productos = shuffle(productos) }

    if (q) {
      const normalizedQuery = normalizeString(q.toString()) // me preocupa que no pueda ser un string
      productos = productos.filter((p) =>
        normalizeString(p.product_name).includes(normalizedQuery)
      )
    }

    return res.json(productos)
  }

  static async getById(req, res) {
    const { id } = req.params
    const producto = await ProductosModel.getById({ id })
    if (!producto) {
      throw new AppError("Producto no encontrado", 404)
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

    if (!updatedProducto) throw new AppError("Producto no encontrado", 404)

    res.status(200).json(updatedProducto)
  }

  static async delete(req, res) {
    const { id } = req.params
    const deletedProduct = await ProductosModel.delete({ id })
    if (!deletedProduct) throw new AppError("Producto no encontrado", 404)

    deleteFile(destination + deletedProduct.imagen)

    res.status(204).send()
  }


}
