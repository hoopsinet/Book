import React from 'react';
import useBookStore from '../../store/bookStore';
import './ChapterNavigation.css';

const ChapterNavigation = () => {
  const { chapters, currentPage, previousPage, nextPage } = useBookStore();

  return (
    <div className="chapter-navigation">
      <div className="chapter-navigation__progress">
        <div 
          className="chapter-navigation__progress-bar"
          style={{ width: `${(currentPage / (chapters.length - 1)) * 100}%` }}
        />
      </div>
      
      <div className="chapter-navigation__controls">
        <button 
          className="chapter-navigation__button"
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          <span className="chapter-navigation__arrow">←</span>
          {currentPage > 0 && (
            <span className="chapter-navigation__preview">
              {chapters[currentPage - 1]?.title}
            </span>
          )}
        </button>

        <div className="chapter-navigation__info">
          <span className="chapter-navigation__page">
            {currentPage + 1} / {chapters.length}
          </span>
        </div>

        <button 
          className="chapter-navigation__button"
          onClick={nextPage}
          disabled={currentPage === chapters.length - 1}
        >
          {currentPage < chapters.length - 1 && (
            <span className="chapter-navigation__preview">
              {chapters[currentPage + 1]?.title}
            </span>
          )}
          <span className="chapter-navigation__arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default ChapterNavigation;
