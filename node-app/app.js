import express from 'express'
import fs from 'fs'

const app = express()

let indexHTML = fs.readFileSync('./static/index.html', 'utf-8')

app.get('/', (req, res) => {
    res.send(indexHTML)
})

app.get('/resources/:name', (req, res) => {
    let name = req.params.name
    let resource = fs.readFileSync(`./static/${name}`,'utf-8')
    res.send(resource)
})

app.listen(3000, () => {
    console.log('Server is runing on http://localhost:3000')
})