import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { productosRouter } from './routes/productos.js'

const app = express()

// TODO: podriamos tener un archivo de configuraciones
const PORT = process.env.PORT ?? 3000

// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

// Routas disponibles (primero las de mayor especificidad)
app.use('/api/productos', productosRouter)
app.use('/', express.static('../client/dist/', {
  maxAge: '30d', // El navegador puede cachear los archivos por 30 días
  immutable: true,
}))

// Rutas no encontradas
app.use((req, res) => { 
  res.status(404).json({ error: 'Not Found' })
})

// Si llego acá se rompió todo 💀💀
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})


// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
