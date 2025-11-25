import { AuthController } from "../controllers/auth.js"
import { permission } from "../middleware/permission.js"
import { Router } from "express"

export const authRouter = Router()

authRouter.get("/", permission('user', 'admin'), AuthController.verify)
authRouter.post("/login", AuthController.login)
authRouter.post("/register", AuthController.register)
authRouter.post("/logout", permission('user', 'admin'), AuthController.logout)
