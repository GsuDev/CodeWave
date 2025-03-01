document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save-snippet')
  const titleInput = document.getElementById('snippet-title')
  const codeInput = document.getElementById('snippet-code')
  const languageSelect = document.getElementById('language')
  const snippetList = document.getElementById('snippet-list') // If you want to list snippets in the editor

  // Cargar snippets existentes
  async function loadSnippets () {
    const response = await fetch('snippets.json')
    const snippets = await response.json()

    snippetList.innerHTML = ''
    snippets.forEach((snippet, index) => {
      const item = document.createElement('div')
      item.innerHTML = `
                <h3>${snippet.title}</h3>
                <button onclick="editSnippet(${index})">Edit</button>
            `
      snippetList.appendChild(item)
    })
  }

  // Guardar un nuevo snippet
  saveButton.addEventListener('click', async () => {
    const newSnippet = {
      title: titleInput.value,
      code: codeInput.value,
      language: languageSelect.value
    }

    const response = await fetch('snippets.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSnippet)
    })

    if (response.ok) {
      alert('Snippet saved!')
      loadSnippets()
    } else {
      alert('Failed to save snippet.')
    }
  })

  // Editar un snippet existente
  window.editSnippet = async (index) => {
    const response = await fetch('snippets.json')
    const snippets = await response.json()
    const snippet = snippets[index]

    // Pre-fill inputs
    titleInput.value = snippet.title
    codeInput.value = snippet.code
    languageSelect.value = snippet.language

    // Update the save button
    saveButton.textContent = 'Update Snippet'
    saveButton.onclick = async () => {
      const updatedSnippet = {
        title: titleInput.value,
        code: codeInput.value,
        language: languageSelect.value
      }

      const response = await fetch(`snippets.json${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSnippet)
      })

      if (response.ok) {
        alert('Snippet updated!')
        saveButton.textContent = 'Save Snippet'
        saveButton.onclick = saveNewSnippet
        loadSnippets()
      } else {
        alert('Failed to update snippet.')
      }
    }
  }

  loadSnippets()
})
