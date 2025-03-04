import mysql from 'mysql2/promise'
import { validateSnippet } from '../../schemas/snippet.js'

// Conector de la base de datos
const conn = await mysql.createConnection({
  host: 'codewave-db',
  user: 'user',
  password: 'password',
  database: 'codewave'
})

// Funcionamiento de mysql2

// La base de datos devuelve un objeto por fila, cuando hacemos una query debemos almacenar el resultado
// en un array y luego acceder a la primera posición del array para obtener un array de objetos fila porque en la segunda
// posición del array se almacenan los metadatos de la query.
// Será [[{fila-1},{fila-2}],[metadatos]]

// Ejemplo:
// const [rows] = await conn.query('SELECT * FROM snippets')
// const snippets = rows

// Hemos usado destructuring para guardar el primer elemento del array que nos devuelve la query en la variable rows.
// Luego hemos guardado el valor de rows en la variable snippets.
// La variable snippets contiene un array de objetos, cada objeto es una fila de la tabla snippets.

// Hay que hacer manejo de errores
export class SnippetModel {
  // Recupera todos los snippets de la base de datos
  static async getSnippets (incomingQuery) {
    const result = validateQuery(incomingQuery)
    const [snippets] = await conn.query(
      'SELECT * FROM snippets'
    )
    return snippets
  }

  // Recupera un snippet por su id
  static async getById ({ id }) {
    const [snippet] = await conn.query(
      'SELECT * FROM snippets WHERE id = ?',
      [id]
    )
    if (snippet.length === 0) return null
    return snippet[0]
  }

  // Recupera un snippet por su title
  // No es seguro hay que hacer que llegue tambien
  // el id del usuario sino pueden ver los de los demas
  static async getByTitle ({ title }) {
    const [snippets] = await conn.query(
      'SELECT * FROM snippets WHERE title LIKE ?',
      [`%${title}%`]
    )
    if (snippets.length === 0) return null
    return snippets
  }

  // Crea un nuevo snippet en la base de datos
  static async create (incomingSnippet) {
    // Usamos zod para validar la request
    const result = validateSnippet(incomingSnippet)
    if (result.error) {
      return { error: true, message: JSON.parse(result.error.message) }
    }

    // Pedimos a la base de datos un UUID para el nuevo snippet
    const [UUID] = await conn.query('SELECT UUID() as id')
    // Usamos destructuring para obtener el id del resultado
    const [{ id }] = UUID

    // Uso propagación para construir el objeto
    const newSnippet = {
      id,
      // Datos ya validados
      ...result.data
    }

    // Insertamos el nuevo snippet en la base de datos
    await conn.query(
      'INSERT INTO snippets (id, user_id, title, description, lang, code) VALUES (?, ?, ?, ?, ?, ?)',
      [id, newSnippet.user_id, newSnippet.title, newSnippet.description, newSnippet.lang, newSnippet.code]
    )

    // Devolvemos el nuevo snippet
    return { snippet: newSnippet, error: false }
  }
}
