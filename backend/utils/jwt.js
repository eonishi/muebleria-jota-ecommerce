import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"
import { AppError } from "../errors/error.js"

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' })
}


export function verifyToken(token) {
  if (!token) throw new AppError("Token inexistente", 403)
  return jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      throw new AppError(err.message, 403)
    }
    return decoded
  })
}
