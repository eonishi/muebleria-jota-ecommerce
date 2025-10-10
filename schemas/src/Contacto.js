import { z } from 'zod'

export const ContactoSchema = z.object({
  username: z.string().trim().min(1, "El nombre es requerido.").regex(/^[A-Z]/, "El nombre debe comenzar con mayúscula"),
  email: z.string().min(1, "El email es requerido.").email("El email es invalido"),
  message: z.string().trim().min(1, "El mensaje es requerido."),
})
