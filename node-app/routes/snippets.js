import { Router } from 'express'
import { readJson } from '../utils/json.js'
import { SnippetController } from '../controllers/snippets.js'

// Creo un router para los snippets
export const snippetsRouter = Router()

// Devuelve todos los snippets
snippetsRouter.get('/', SnippetController.getAll)

// Devuelve un snippet con una id concreta
snippetsRouter.get('/:id', SnippetController.getById)

// Recive un nuevo snippet y lo guarda en el json
snippetsRouter.post('/', (req, res) => {
  const snippets = readJson('../snippets.json')
  const newSnippet = {
    id: crypto.randomUUID(),
    ...req.body
  }
  snippets.push(newSnippet)
  res.status(201).json(newSnippet)
})

// Reemplaza un snippet por id
snippetsRouter.put('/:id', (req, res) => {
  const { id } = req.params
  const snippets = readJson('../snippets.json')
  const existingSnippet = snippets.find(user => user.id === id)
  const snippet = { ...req.body }
  if (existingSnippet) {
    const index = snippets.findIndex(snippet)
    snippets[index] = snippet
    res.send(snippet)
  } else {
    snippets.push(snippet)
    res.json(snippet)
  }
})

snippetsRouter.patch('/:id', (req, res) => {
})

snippetsRouter.delete('/:id', (req, res) => {
})
