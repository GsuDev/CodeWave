import express, { json } from 'express'
import path from 'path'
import { snippetsRouter } from './routes/snippets.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const __dirname = path.resolve() // Obtiene la ruta absoluta del directorio actual

app.use(json())
app.disable('x-powered-by')
// Middleware de CORS
app.use(corsMiddleware())
// Sirve archivos estáticos desde la carpeta "static"
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

// Enrutador de snippets
app.use('/snippets', snippetsRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Static files are served from ${path.join(__dirname, 'static')}`)
})
