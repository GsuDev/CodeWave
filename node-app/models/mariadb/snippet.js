import mysql from 'mysql2/promise'
import { validateSnippet } from '../../schemas/snippet.js'
import { validateQuery } from '../../schemas/query.js'

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
  // Recupera todos los snippets de la base de datos o si se pasan query
  // params los recupera y devuelve según estos
  static async getSnippets (incomingQuery) {
    // Hacemos la validación con su schema de zod
    const result = validateQuery(incomingQuery)

    // Si había query params y estos tienen un error se devuelve el error
    if (result && result.error) return { error: true, message: JSON.parse(result.error.message) }
    // Si en este punto hay query params estos son validos
    if (Object.keys(result.data).length > 0) {
      // Guardamos el objeto donde vienen los query params en dos arrays
      // En este las claves
      const keys = Object.keys(result.data)
      // En este los valores
      const values = Object.values(result.data)

      // Construyo la query en una variable
      let query = 'SELECT * FROM snippets WHERE '

      // Añado las condiciones con el nombre del atributo y el valor que ha pasado el usuario con un LIKE enmedio
      const conditions = keys.map((columna) => `${columna} LIKE ?`)
      query += conditions.join(' AND ') // Unir todas las condiciones con "AND"

      // Se asegura que los valores se pasen correctamente como parámetros
      const formattedValues = values.map(value => `%${value}%`)

      console.log('Ejecutando consulta:', query, 'con valores:', formattedValues)

      // Pasamos la query y los valores separados
      const [snippets] = await conn.query(query, formattedValues)

      return { data: snippets, error: false }
    }

    const [snippets] = await conn.query('SELECT * FROM snippets')
    return { data: snippets, error: false }
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
    return { data: newSnippet, error: false }
  }
}
