import { AppError } from "../../../errors/error.js";
import { Error as MongooseError } from "mongoose"


// Si no lo programe mal,
// Enlista todos los errores de validaciones en 'message' y los envia todos juntos.
// Asi el usuario puede ver de golpe en todos los campos donde le pifio.
export function throwValidateMongoError(err) {
  if (err instanceof MongooseError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ")
    throw new AppError(message, 400)
  }
}

export function isValidMongoId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

export function throwMongooseError(err) {
  if (err instanceof MongooseError) {
    throw new AppError(err.message, 400)
  }
  throw err
}

