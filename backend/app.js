import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { apiRouter } from './routes/api.js'
import { clientRouter } from './routes/client.js'
import { globalErrorHandler } from './middleware/globalErrorHandler.js'
import { limiter } from './middleware/rateLimit.js'
import compression from 'compression'


const app = express()

// TODO: podriamos tener un archivo de configuraciones
const PORT = process.env.PORT ?? 3000

// Middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(limiter)
app.use(compression())

// Endpoints de la api
app.use('/api', apiRouter)

// Archivos estáticos (el frontend)
app.use('/', clientRouter)

// Manejador de errores
app.use(globalErrorHandler)

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
