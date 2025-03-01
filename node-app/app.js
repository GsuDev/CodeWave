import express from 'express'
import path from 'path'

const app = express()
const __dirname = path.resolve() // Obtiene la ruta absoluta del directorio actual

// Sirve archivos estáticos desde la carpeta "static"
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
