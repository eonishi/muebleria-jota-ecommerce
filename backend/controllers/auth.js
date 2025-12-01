import { UserModel } from "../models/mongo/user.js"
import { AppError } from "../errors/error.js"
import bcrypt from "bcrypt"
import { generateToken, verifyToken } from "../utils/jwt.js"
import { APP_MODE } from "../config.js"

const ACCESS_TOKEN_NAME = 'access_token'
const COOKIE_OPTIONS = {
  httpOnly: true, // evita el xss
  secure: APP_MODE === 'prod', // solo por https (en prod)
  sameSite: 'strict', // la cookie funciona exclusivamente en mi dominio
  maxAge: 1000 * 60 * 60 * 24 * 2, // 2 dias. Es redundante ya que igualmente la validez del token esta limitada temporalmente.
}

export class AuthController {
  static async verify(req, res) {
    // La idea es verificar si el token es valido
    // y devolver lo información que hay en el payload del token.


    // Envio directamente la infomarción de req.user porque el middleware 'permission'
    // deberia encargarse de gestionar los edge cases y adjuntar el user a la req.
    return res.status(200).json(req.user)
  }

  static async register(req, res) {
    const user = { ...req.body }

    const newUser = await UserModel.create(user)
    if (!newUser) {
      throw new AppError("No se pudo crear el usuario, intente nuevamente", 400)
    }

    return res.status(200).json({
      // No envies TODO el usuario porque filtras datos sensibles
      id: newUser.id,
      message: "Usuario creado con éxito!"
    })
  }

  static async login(req, res) {
    const { email, password } = { ...req.body }
    if (!email || !password) throw new AppError("toda la información es requerida", 400)

    const validUser = await UserModel.getByEmail(email)
    if (!validUser) throw new AppError("credenciales inválidas", 401)

    const isPassMatch = await bcrypt.compare(password, validUser.password)
    if (!isPassMatch) throw new AppError("credenciales inválidas", 401)

    // Si el usuario es valido generar un token para que pueda acceder a las rutas privadas
    const token = generateToken({
      id: validUser.id,
      role: validUser.role,
      email: validUser.email,
      username: validUser.username
    })
    return res
      .status(200)
      .cookie(ACCESS_TOKEN_NAME, token, COOKIE_OPTIONS)
      .json({ message: "Login exitoso" })
  }

  static logout(req, res) {
    res.cookie(ACCESS_TOKEN_NAME, '', { ...COOKIE_OPTIONS, expires: new Date(0) })
    res.status(200).json({ message: "Logout exitoso" })
  }
}
