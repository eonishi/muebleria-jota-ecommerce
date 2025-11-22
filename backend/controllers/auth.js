import { UserModel } from "../models/mongo/user.js"
import { AppError } from "../errors/error.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js"
import { APP_MODE } from "../config.js"

export class AuthController {
  static async register(req, res) {
    const user = { ...req.body }

    const newUser = await UserModel.create(user)
    if (!newUser) {
      throw new AppError("No se pudo crear el usuario, intente nuevamente", 400)
    }

    return res.status(200).json({
      id: newUser.id,
      message: "Usuario creado con éxito!"
    })

  }

  static async login(req, res) {
    const { email, password } = req.body
    if (!email || !password) throw new AppError("toda la información es requerida", 400)

    const validUser = await UserModel.getByEmail(email)
    if (!validUser) throw new AppError("credenciales inválidas", 400)

    const isPassMatch = await bcrypt.compare(password, validUser.password)
    if (!isPassMatch) throw new AppError("credenciales inválidas", 400)

    // Si el usuario es valido generar un token para que pueda acceder a las rutas privadas
    const token = generateToken({ id: validUser.id })
    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true, // evita el xss
        secure: APP_MODE === 'prod', // solo por https (en prod)
        sameSite: 'strict', // la cookie funciona exclusivamente en mi dominio
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 dias. Es redundante ya que igualmente la validez del token esta limitada temporalmente.
      })
      .json({ message: "Login exitoso" })
  }
}
