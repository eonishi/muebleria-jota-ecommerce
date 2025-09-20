import express from 'express'
import { productosRouter } from './routes/productos.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// Middleware
app.use(express.json())

// Routas disponibles (primero las de mayor especificidad)
app.use('/api/productos', productosRouter)
app.use('/', (req, res) => { res.json('Hello World! 👋') })

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
