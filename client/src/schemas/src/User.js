import { z } from "zod";

export const UserRegisterSchema = z.object({
  username: z.string().trim().min(1, "El nombre es requerido").max(32, "El nombre de usuario no debe tener más de 32 caracteres"),
  email: z.string().trim().lowercase().min(1, "El email es requerido").email("El email es invalido"),
  password: z.string().min(8, "Debe tener como mínimo 8 caracteres"),
})


export const UserLoginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("El email es invalido"),
  password: z.string().min(1, "La contraseña es requerida"),
})
