import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, []);

  async function handleAddRepository() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    const { data } = await api.post('/repositories', {
      title,
      url,
      techs: [],
    })

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <input type="text" id="title"placeholder="Title"/>
      <input type="text" id="url" placeholder="url"/>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
