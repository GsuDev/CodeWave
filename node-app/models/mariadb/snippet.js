import mysql from 'mysql2/promise'

const conn = await mysql.createConnection({
  host: 'codewave-db',
  user: 'user',
  password: 'password',
  database: 'codewave'
})

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

export class SnippetModel {
  // Recupera todos los snippets de la base de datos
  static async getAll () {
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

  // Crea un nuevo snippet en la base de datos
  static async create (incomingSnippet) {
    // Pedimos a la base de datos un UUID para el nuevo snippet
    const [idResult] = await conn.query('SELECT UUID() as id')
    console.log(idResult)
    // Usamos destructuring para obtener el id del resultado
    const [{ id }] = idResult

    // Insertamos el nuevo snippet en la base de datos
    await conn.query(
      'INSERT INTO snippets (id, user_id, title, description, lang, code) VALUES (?, ?, ?, ?, ?, ?)',
      [id, incomingSnippet.user_id, incomingSnippet.title, incomingSnippet.description, incomingSnippet.lang, incomingSnippet.code]
    )

    // Recuperamos el nuevo snippet de la base de datos
    const [newSnippet] = await conn.query(
      'SELECT * FROM snippets WHERE id = ?',
      [id]
    )

    // Devolvemos el nuevo snippet
    return newSnippet[0]
  }
}
