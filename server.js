const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ruta para obtener los snippets
app.get('/snippets', (req, res) => {
    fs.readFile('snippets.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading snippets.json' });
        res.json(JSON.parse(data));
    });
});

// Ruta para guardar un nuevo snippet
app.post('/snippets', (req, res) => {
    const newSnippet = req.body;

    fs.readFile('snippets.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading snippets.json' });

        const snippets = JSON.parse(data);
        snippets.push(newSnippet);

        fs.writeFile('snippets.json', JSON.stringify(snippets, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).json({ error: 'Error writing snippets.json' });
            res.status(201).json({ message: 'Snippet saved successfully' });
        });
    });
});

// Ruta para editar un snippet
app.put('/snippets/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedSnippet = req.body;

    fs.readFile('snippets.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading snippets.json' });

        const snippets = JSON.parse(data);
        if (index < 0 || index >= snippets.length) {
            return res.status(404).json({ error: 'Snippet not found' });
        }

        snippets[index] = updatedSnippet;

        fs.writeFile('snippets.json', JSON.stringify(snippets, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).json({ error: 'Error writing snippets.json' });
            res.json({ message: 'Snippet updated successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
