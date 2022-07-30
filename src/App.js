import { useState } from 'react';
import './App.scss';
import Characters from './response_marvel.json';
function App() {
  const [query, setQuery] = useState('');
  console.log(Characters.data?.results?.filter(character =>
      character.name.toLowerCase().includes('loki')
    )
  );
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='App-header_contenedor'>
          <p>Marvel´s charracter list</p>
          <div className='buscador'>
            <input
              type='text'
              placeholder='Buscar como...'
              className='search'
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='btn'>Buscar</button>
          </div>
        </div>
      </header>
      <main className='App-main'>
        <div className='App-main_contenedor'>
          <ul className='listCharacter'>
            {Characters.data?.results?.filter((character) =>
              character.name.toLowerCase().includes(query))
              .map((character) => {
              return (
                <li className='listCharacter_item' key={character.id}>
                  <div className='contenedor-elemento'>
                    <img
                      src={`${character.thumbnail?.path}.jpg`}
                      alt={character.name}
                    />
                    <div className='character-data'>
                      <h2>{character.name}</h2>
                      <ul>
                        <li> Comics: {character.comics?.available}/ </li>
                        <li> Series: {character.series?.available}/ </li>
                        <li> Events: {character.events?.available}/</li>
                        <li> Stories: {character.stories?.available} </li>
                      </ul>
                    </div>
                  </div>
                  <button className='btn'>x</button>
                </li>
              );
            })}
          </ul>
        </div>
        
      </main>
    </div>
  );
}

export default App;
