import express, { json } from 'express'
import path from 'path'
import { snippetsRouter } from './routes/snippets.js'
import { corsMiddleware } from './middlewares/cors.js'

const Server = express()
const __dirname = path.resolve() // Obtiene la ruta absoluta del directorio actual

Server.use(json())
Server.disable('x-powered-by')
// Middleware de CORS
Server.use(corsMiddleware())
// Sirve archivos estáticos desde la carpeta "static"
Server.use(express.static(path.join(__dirname, 'static')))

Server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

// Enrutador de snippets
Server.use('/snippets', snippetsRouter)

const PORT = process.env.PORT ?? 3000

Server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Static files are served from ${path.join(__dirname, 'static')}`)
})
