import { mongoose } from "mongoose"
import { ProductoSchema } from "./schemas/Producto.js"
import { throwValidateMongoError, isValidMongoId, throwMongooseError } from "./utils/errors.js"

// Defino el modelo de los productos y sus métodos
const Producto = mongoose.model("Producto", ProductoSchema)
export class ProductosModel {
  static async getAll() {
    return await Producto.find()
  }

  static async getById({ id }) {
    if (!isValidMongoId(id)) {
      return null
    }

    const producto = await Producto.findById(id)
    return producto
  }

  static async getByIds(ids = []) {
    ids = ids.filter(isValidMongoId)
    if (ids.length === 0) { return [] }
    return await Producto.find({ _id: { $in: ids } }).lean() // mongoose doc: lean is great for high-performance, read-only cases
  }

  static async create(producto) {
    const newProducto = new Producto(producto)

    // Validacion y error handler
    const err = newProducto.validateSync()
    throwValidateMongoError(err)

    return await newProducto.save()
  }

  static async update({ id, producto }) {
    if (!isValidMongoId(id)) {
      return null
    }

    try {
      const updatedProducto = await Producto.findByIdAndUpdate(id, producto, {
        new: true,
        runValidators: true,
      })
      return updatedProducto
    } catch (err) {
      throwMongooseError(err)
    }
  }

  static async delete({ id }) {
    if (!isValidMongoId(id)) {
      return null
    }

    try {
      return await Producto.findByIdAndDelete(id)
    } catch (e) {
      throwMongooseError(err)
    }
  }

  static async
}
