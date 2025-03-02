import mysql from 'mysql2/promise'

const conn = await mysql.createConnection({
  host: 'codewave-db',
  user: 'user',
  password: 'password',
  database: 'codewave'
})

export class SnippetModel {
  static async getAll () {
    const [snippets] = await conn.query(
      'SELECT * FROM users'
    )
    console.log(snippets)
    return snippets
  }
}
