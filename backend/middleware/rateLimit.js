import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 100,
  message: "Alcanzaste el limite máximo de uso, por favor volvé más tarde",
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})