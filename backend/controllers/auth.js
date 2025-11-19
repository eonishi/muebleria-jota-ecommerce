import { UserModel } from "../models/mongo/user.js"
import { AppError } from "../errors/error.js"
import { bcrypt } from "bcrypt"
import { jwt } from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"

export class AuthController {
	static async register(req, res, next) {
		const { username, email, password } = req.body

		const newUser = await UserModel.create(username, email, password)
		if (!newUser) {
			throw new AppError("No se pudo crear el usuario, intente nuevamente", 400)
		}

		// Tiene sentido que devuelva todo el user con password incluido??
		// Capaz solo devolver el id de usuario
		return res.status(200).json(newUser)
	}

	static async login(req, res, next) {
		const { email, password } = req.body
		if (!email || !password) throw new AppError("toda la información es requerida", 400)

		validUser = await UserModel.get(email)
		if (!validUser) throw new AppError("credenciales invalidas", 400)

		const isPassMatch = await bcrypt.compare(password, user.password)
		if (!isPassMatch) throw new AppError("credenciales invalides", 400)

		// Si el usuario es valido generar un token para que pueda acceder a las rutas privadas
		const token = jwt.sign({ id: validUser.id }, JWT_SECRET, { expiresIn: "1d" })
		return res.status(200).json({ message: "Login exitoso", token })
	}
}
