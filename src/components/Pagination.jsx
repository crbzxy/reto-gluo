import React from 'react';

const Pagination = ({ totalPages, handleClick, page }) => {
  const pages = [...Array(totalPages).keys()].map(number => number + 1);

  return (
    <div className="numbers">
      
      {pages.map(number => (
        <a
          key={number}
          href="/#"
          onClick={() => handleClick(number)}
          className={`${page === number && 'active'}`}
        >
          {number}
        </a>
      ))}
    </div>
  );
};

export default Pagination;