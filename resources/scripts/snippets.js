document.addEventListener('DOMContentLoaded', () => {
    const snippetsContainer = document.getElementById('snippets-container');

    // Load and display snippets
    async function loadSnippets() {
        try {
            const response = await fetch('snippets.json');
            const snippets = await response.json();

            snippetsContainer.innerHTML = ''; // Clear container
            snippets.forEach((snippet, index) => {
                const snippetCard = document.createElement('div');
                snippetCard.className = 'snippet-card';
                snippetCard.innerHTML = `
                    <h3>${snippet.title}</h3>
                    <pre><code>${snippet.code}</code></pre>
                    <p><strong>Language:</strong> ${snippet.language}</p>
                    <button class="edit-snippet" data-index="${index}">Edit</button>
                `;
                snippetsContainer.appendChild(snippetCard);
            });

            addEditListeners();
        } catch (error) {
            console.error('Error loading snippets:', error);
        }
    }

    // Add event listeners to edit buttons
    function addEditListeners() {
        document.querySelectorAll('.edit-snippet').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                window.location.href = `app.html?edit=${index}`;
            });
        });
    }

    loadSnippets();
});
