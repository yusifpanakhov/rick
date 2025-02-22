import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data?.results || data.results.length === 0) {
    return <div className="no-characters">No characters found</div>;
  }

  return (
    <div className="container">
      <div className="card-grid">
        {data.results.map((character) => (
          <div key={character.id} className="card">
            <img
              src={character.image}
              alt={character.name}
              className="card-image"
            />
            <div className="card-content">
              <h3>{character.name}</h3>
              <p><strong>Species:</strong> {character.species}</p>
              <p><strong>Status:</strong> {character.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
