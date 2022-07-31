import { useState } from 'react';
import './App.scss';
import Characters from './response_marvel.json';

function App() {
  const [query, setQuery] = useState('');

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const renderData = (data) => {
    return (
      <ul className='listCharacter'>
        {Characters.data?.results
          ?.filter((character) => character.name.toLowerCase().includes(query))
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
                <button  className='btn'>x</button>
              </li>
            );
          })}
      </ul>
    );
  };
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(Characters.data?.count / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Characters.data?.results.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? 'active' : null}>
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

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
        <div className='App-main_contenedor'>{renderData(currentItems)}</div>
        <ul className='pageNumbers'>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}>
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}>
              Next
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
