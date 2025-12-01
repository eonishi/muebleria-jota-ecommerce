import { Schema } from "mongoose";
import { commonFormat } from "../utils/format.plugin.js";

export const PedidosSchema = new Schema({
  // Simulo un OneToMany (user ---< pedidos)
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: [1, "La cantidad mínima es uno"],
        // Se podria implementar un máximo de cantidad, pero también depende del modelo de negocio.
        // Ej: Un modelo puede ser hacer los muebles a pedido.
        //  Y otro puede ser solo vender el stock disponible. (CONSULTAR)
      },
      _id: false,
    }],
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: [0, "El precio mínimo es cero"],
  },
  state: {
    type: String,
    // Los estados de los pedidos dependen del modelo de negocio, (CONSULTAR)
    enum: ['pendiente', 'cancelado', 'en proceso', 'entregado'],
    required: true,
    default: 'pendiente'
  },
}, { timestamps: true })

PedidosSchema.plugin(commonFormat)

