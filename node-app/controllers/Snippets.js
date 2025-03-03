import { SnippetModel } from '../models/mariadb/snippet.js'

// Controlador de los snippets
export class SnippetController {
  // Obtener todos los snippets
  static async getAll (req, res) {
    const snippets = await SnippetModel.getAll()
    return res.json(snippets)
  }

  // Obtener un snippet por id
  static async getById (req, res) {
    // Recupera el parametro id de la url
    const { id } = req.params
    // Pide a base de datos el snippet con esa id
    const snippet = await SnippetModel.getById({ id })
    // Si no lo encuentra da 404
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' })
    return res.json(snippet)
  }

  // Obtener un snippet por id
  static async getByTitle (req, res) {
    // Recupera el parametro title de la url
    const { title } = req.params // Obtener el título desde req.params

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const decodedTitle = decodeURIComponent(title) // Decodifica espacios y caracteres especiales
    // Pide a base de datos el snippet con ese title
    const snippet = await SnippetModel.getByTitle({ title: decodedTitle })
    // Si no lo encuentra da 404
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' })
    return res.json(snippet)
  }

  // Crear/Guardar un snippet
  static async create (req, res) {
    const newSnippet = await SnippetModel.create(req.body)
    if (newSnippet.error) return res.status(400).json({ message: newSnippet.message })
    return res.status(201).json(newSnippet.snippet)
  }
}
