import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use('/', (req, res) => { res.json('Hello World! 👋') })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
