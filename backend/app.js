import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { apiRouter } from './routes/api.js'
import { clientRouter } from './routes/client.js'

const app = express()

// TODO: podriamos tener un archivo de configuraciones
const PORT = process.env.PORT ?? 3000

// Middlewares
app.use(morgan('tiny'))
app.use(cors())

// Endpoints de la api
app.use('/api', apiRouter)

// Archivos estáticos (el frontend)
app.use('/', clientRouter)

// Si llego acá se rompió todo 💀💀
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
