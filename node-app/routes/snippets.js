import { Router } from 'express'
import { SnippetController } from '../controllers/snippets.js'

// Creo un router para los snippets
export const snippetsRouter = Router()

// Devuelve todos los snippets
snippetsRouter.get('/', SnippetController.getSnippets)

// Devuelve un snippet con una id concreta
snippetsRouter.get('/:id', SnippetController.getById)

// Recive un nuevo snippet y lo guarda en el json
snippetsRouter.post('/', SnippetController.create)

// Reemplaza un snippet por id
snippetsRouter.put('/:id', SnippetController.replaceSnippet)

snippetsRouter.patch('/:id', (req, res) => {
})

snippetsRouter.delete('/:id', (req, res) => {
})
