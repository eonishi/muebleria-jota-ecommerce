import { Schema  } from "mongoose"

export const ProductoSchema = new Schema({
  product_name: {
    type: String,
    cast: "{VALUE} no es un nombre válido",
    required: [true, "El nombre del producto es requerido"],
  },
  imagen: { type: String, required: false },
  description: { type: String, required: false },
  price: {
    type: Number,
    cast: "{VALUE} no es un número válido",
    required: [true, "El precio es requerido"],
    min: [0, "El precio no puede ser negativo"],
  },
  stock: {
    type: Number,
    cast: "{VALUE} no es un número válido",
    required: false,
    min: [0, "El stock no puede ser negativo"],
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  specifications: {
    type: Object,
    of: String,
    cast: "{VALUE} no es un objeto válido",
    required: false,
    set: (value) => {
      // Las specifications deberian llegar como stringify json, así que las convierto en json
      try { return JSON.parse(value) }
      catch (e) { return null } // Si no puede parsearlo devuelvo un null para que el validate lo maneje
    },
    validate: {
      validator: (value) => value instanceof Object,
      message: "'specifications' debe ser un JSON de strings válidos",
    },
  },
}).set("toJSON", {
  // Formato de los datos al devolverlos
  transform: (doc, returnedObject) => {
    // Convierto el campo '_id' en 'id' porque así recibe los datos el cliente
    // y elimino el campo '__v' que es propio de MongoDB, no tiene que ver con la api
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})