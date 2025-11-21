import { z } from 'zod'

export const ContactoSchema = z.object({
  username: z.string().trim().min(1, "El nombre es requerido.").regex(/^[A-Z]/, "El nombre debe comenzar con mayúscula"),
  email: z.string().min(1, "El email es requerido.").email("El email es invalido"),
  phone: z.string().trim().regex(/^[0-9+ -]*$/, "El número es invalido").optional(),
  subject: z.string().trim().max(128, "Un poco más corto, por favor.").optional(),
  message: z.string().trim().min(1, "El mensaje es requerido."),
})
