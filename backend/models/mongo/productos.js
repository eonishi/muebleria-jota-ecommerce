import { DB_CONNECTION_STRING } from "../../config.js";
import { mongoose, Schema } from "mongoose";

// Conexion a la base de datos
await mongoose.connect(DB_CONNECTION_STRING);

// Defino el esquema de los productos
const ProductoSchema = new Schema({
	product_name:   { type: String, required: true },
	imagen:         { type: String, required: false },
	description:    { type: String, required: false },
	price:          { type: Number, required: true, min: 0 },
	stock:          { type: Number, required: false, min: 0 },
	createdAt:      { type: Date, default: Date.now },
	updatedAt:      { type: Date, default: Date.now },
  specifications: {
    type: Object,
    required: false,
    set: (v) => {
      try { return JSON.parse(v) }
      catch (e) { return v }
    },
  },
}).set('toJSON', { // Formato de los datos al devolverlos
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Defino el modelo de los productos
const Producto = mongoose.model('Producto', ProductoSchema)
export class ProductosModel { 
  static async getAll() { 
    try {
      return await Producto.find()
    } catch (e) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  static async getById({ id }) { 
    try {
      return await Producto.findById(id)
    } catch (e) {
      console.error(e.message)
      //throw new Error('Error al obtener el producto')
      return null
    }
  }

  static async create(producto) { 
    try {
      return await Producto.create(producto)
    } catch (e) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  static async update({ id, producto }) { 
    try {
      return await Producto.findByIdAndUpdate(id, producto, { new: true })
    } catch (e) {
      console.error(e.message)
      //throw new Error('Error al actualizar el producto')
      return null
    }
  }

  static async delete({ id }) { 
    try {
      return await Producto.findByIdAndDelete(id)
    } catch (e) {
      console.error(e.message)
      //throw new Error('Error al eliminar el producto')
      return null
    }
  }
}