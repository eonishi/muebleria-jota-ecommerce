import jwt from "jsonwebtokene"
import { JWT_SECRET } from "../config"

export function generateToken(payload) {
	return jwt.sign(payload, JWT_SECRET, { expiredIn: "1d" })
}


export function verifyTokent(token) {
	return jwt.verify(token, JWT_SECRET)
}
