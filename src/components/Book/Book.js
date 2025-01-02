import React, { useState, useEffect } from 'react';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import coverImage from '../../assets/images/cover';
import backImage from '../../assets/images/Dos.png';
import './Book.css';

const Book = () => {
  const [bookState, setBookState] = useState('cover');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turningDirection, setTurningDirection] = useState(null);
  const [cachedPages, setCachedPages] = useState(null);

  useEffect(() => {
    const loadPages = async () => {
      const pages = await getAllPages();
      setCachedPages(pages);
    };
    loadPages();
  }, []);

  const handleStateChange = (newState) => {
    if (newState === 'forward') {
      if (bookState === 'cover') {
        setBookState('characters');
      } else if (bookState === 'characters') {
        setBookState('story');
        setCurrentPage(0);
      }
    } else if (newState === 'back') {
      if (bookState === 'story') {
        setBookState('characters');
      } else if (bookState === 'characters') {
        setBookState('cover');
      } else if (bookState === 'backcover') {
        setBookState('cover');
      }
    } else if (newState === 'backcover') {
      setBookState('backcover');
    }
  };

  const handlePageTurn = (direction) => {
    if (isPageTurning) return;    
    const pages = cachedPages ? cachedPages.pages : [];
     
    if (direction === 'prev' && currentPage > 0) {
      setIsPageTurning(true);
      setTurningDirection(direction);
      setCurrentPage(currentPage - 2);
      setTimeout(() => {
        setIsPageTurning(false);
        setTurningDirection(null);
      }, 150);
    } else if (direction === 'next' && currentPage + 2 < pages.length) {
      setIsPageTurning(true);
      setTurningDirection(direction);
      setCurrentPage(currentPage + 2);
      setTimeout(() => {
        setIsPageTurning(false);
        setTurningDirection(null);
      }, 150);
    }
  };

  const splitTextIntoPages = (text) => {
    if (!text) return [];
    
    const tempElement = document.createElement('div');
    tempElement.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: 520px;
      font-size: 16px;
      line-height: 1.8;
      font-family: Georgia, serif;
      text-align: justify;
      padding: 40px;
      height: 720px;
    `;
    document.body.appendChild(tempElement);

    const words = text.split(/\s+/);
    const pages = [];
    let currentPage = [];
    let currentText = '';

    for (let word of words) {
      const testText = currentText + (currentText ? ' ' : '') + word;
      tempElement.textContent = testText;

      if (tempElement.scrollHeight > tempElement.clientHeight) {
        const lastText = currentPage.join(' ');
        const lastPeriodIndex = lastText.lastIndexOf('.');
        
        if (lastPeriodIndex !== -1 && lastPeriodIndex > lastText.length - 30) {
          const beforePeriod = lastText.substring(0, lastPeriodIndex + 1);
          const afterPeriod = lastText.substring(lastPeriodIndex + 1).trim();
          
          pages.push(beforePeriod.trim());
          currentPage = afterPeriod ? [afterPeriod, word] : [word];
          currentText = currentPage.join(' ');
        } else {
          pages.push(currentPage.join(' '));
          currentPage = [word];
          currentText = word;
        }
      } else {
        currentPage.push(word);
        currentText = testText;
      }
    }

    if (currentPage.length > 0) {
      pages.push(currentPage.join(' '));
    }

    document.body.removeChild(tempElement);
    return pages;
  };

  const getAllPages = async () => {
    try {
      const response = await fetch('/roman.md');
      const text = await response.text();
      
      const chapters = text.split(/^## /m).filter(Boolean);
      
      const processedChapters = chapters.map(chapter => {
        const lines = chapter.trim().split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();
        return { title, content };
      });

      const pages = [];
      processedChapters.forEach(chapter => {
        const chapterPages = splitTextIntoPages(chapter.content);
        pages.push(...chapterPages.map(page => ({
          content: page,
          chapter: chapter.title
        })));
      });

      return { pages, chapters: processedChapters };
    } catch (error) {
      console.error('Error loading content:', error);
      return { pages: [], chapters: [] };
    }
  };

  const renderContent = () => {
    switch (bookState) {
      case 'cover':
        return (
          <div className="book-cover" onClick={() => handleStateChange('forward')}>
            <img src={coverImage} alt="Book Cover" />
          </div>
        );

      case 'characters':
        return (
          <div className="character-pages">
            <div className="character-page left-character">
              <img src={ryuImage} alt="Ryu" className="character-image" />
              <div className="character-info">
                <h2>Ryu</h2>
                <p>Protagoniste principal, un lycéen solitaire et désabusé qui cherche un sens à sa vie.</p>
              </div>
            </div>
            <div className="character-page right-character">
              <img src={adelineImage} alt="Adeline" className="character-image" />
              <div className="character-info">
                <h2>Adeline</h2>
                <p>Une camarade de classe de Ryu, qui pourrait bien changer sa vision du monde.</p>
              </div>
            </div>
          </div>
        );

      case 'story':
        const { pages, chapters } = cachedPages || { pages: [], chapters: [] };
        const leftPageIndex = currentPage;
        const rightPageIndex = currentPage + 1;
        
        return (
          <div className="book-pages">
            <div className="page left-page">
              <div className="page-content">
                {leftPageIndex === 0 && chapters[0] && (
                  <h2 className="page-title">{chapters[0].title}</h2>
                )}
                <div className="page-text">
                  {pages[leftPageIndex]?.content}
                </div>
                <div className="page-number">{leftPageIndex + 1}</div>
              </div>
            </div>
            <div className="page right-page">
              <div className="page-content">
                <div className="page-text">
                  {pages[rightPageIndex]?.content}
                </div>
                <div className="page-number">{rightPageIndex + 1}</div>
              </div>
            </div>
            <div className="navigation-buttons">
              <button 
                className="nav-button prev" 
                onClick={() => handlePageTurn('prev')}
                disabled={currentPage === 0}
              >
                &#8249;
              </button>
              <button 
                className="nav-button next" 
                onClick={() => handlePageTurn('next')}
                disabled={currentPage + 2 >= pages.length}
              >
                &#8250;
              </button>
            </div>
          </div>
        );

      case 'backcover':
        return (
          <div className="book-cover back" onClick={() => handleStateChange('back')}>
            <img src={backImage} alt="Back Cover" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="book-container">
      {renderContent()}
    </div>
  );
};

export default Book;
