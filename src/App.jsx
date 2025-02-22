import React, { useEffect, useState } from 'react';

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
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (!data?.results || data.results.length === 0) {
    return <div>No characters found</div>; 
  }

  return (
    <div className="container">
      <div className="character-grid">
        {data.results.map((character) => (
          <div key={character.id} className="character-card">
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <h3>{character.name}</h3>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Status:</strong> {character.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
