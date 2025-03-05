import { SnippetModel } from '../models/mariadb/snippet.js'

// Controlador de los snippets
export class SnippetController {
  // Obtener todos los snippets
  static async getSnippets (req, res) {
    const snippets = await SnippetModel.getSnippets(req.query)
    if (snippets.error) return res.json(snippets.message)
    return res.json(snippets.data)
  }

  // Obtener un snippet por id
  static async getById (req, res) {
    // Recupera el parametro id de la url
    const { id } = req.params
    // Pide a base de datos el snippet con esa id
    const snippet = await SnippetModel.getById({ id })
    // Si no lo encuentra da 404
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' })
    return res.json(snippet.data)
  }

  // Crear/Guardar un snippet
  static async create (req, res) {
    const newSnippet = await SnippetModel.create(req.body)
    if (newSnippet.error) return res.status(400).json({ message: newSnippet.message })
    return res.status(201).json(newSnippet.data)
  }
}
