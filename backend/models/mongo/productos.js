import { DB_CONNECTION_STRING } from "../../config.js"
import { mongoose, Error as MongooseError } from "mongoose"
import { AppError } from "../../errors/error.js"
import { handleConnection } from "./handleConnection.js"
import { ProductoSchema } from "./schema.js"

// Conexion a la base de datos
handleConnection(DB_CONNECTION_STRING)

// Defino el modelo de los productos y sus métodos
const Producto = mongoose.model("Producto", ProductoSchema)
export class ProductosModel {
	static async getAll() {
		return await Producto.find()
	}

	static async getById({ id }) {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return null
		}
		const producto = await Producto.findById(id)
		return producto
	}

	static async create(producto) {
		const newProducto = new Producto(producto)
		// Validacion y error handler
		const err = newProducto.validateSync()
		if (err instanceof MongooseError) {
			const message = Object.values(err.errors)
				.map((e) => e.message)
				.join(". ")
			throw new AppError(message, 400)
		}

		return await newProducto.save()
	}

	static async update({ id, producto }) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null 
    }
    
		try {
      const updatedProducto = await Producto.findByIdAndUpdate(id, producto, {
        new: true,
        runValidators: true,
      })
			return updatedProducto 
		} catch (err) {
      if (err instanceof MongooseError) {
				throw new AppError(err.message, 400)
      }
			throw err 
		}
	}

  static async delete({ id }) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null 
    }

		try {
			return await Producto.findByIdAndDelete(id)
		} catch (e) {
			if (e instanceof MongooseError) {
				throw new AppError(e.message, 400)
			}
			throw e
		}
	}
}
