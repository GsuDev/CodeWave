import { SnippetModel } from '../models/mariadb/snippet.js'

export class SnippetController {
  static async getAll (req, res) {
    const snippets = await SnippetModel.getAll()
    return res.json(snippets)
  }

  static async getById (req, res) {
    const { id } = req.params
    const snippet = await SnippetModel.getById({ id })
    if (snippet) return res.json(snippet)
    return res.status(404).json({ message: 'Snippet not found' })
  }

  static async create (req, res) {
    const newSnippet = await SnippetModel.create(req.body)
    return res.status(201).json(newSnippet)
  }
}
