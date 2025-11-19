import { AuthController } from "../controllers/auth.js"
import { Routes } from "express"

export const authRouter = Routes()

authRouter.post("/login", AuthController.login)
authRouter.post("/register", AuthController.register)
