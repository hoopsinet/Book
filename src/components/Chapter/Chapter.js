import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/images/arrow-left.svg';
import arrowRight from '../../assets/images/arrow-right.svg';
import { parseBookContent } from '../../utils/bookParser';
import './Chapter.css';

const Chapter = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookContent = async () => {
      try {
        console.log('Tentative de chargement du fichier roman.md...');
        const response = await fetch('/Book/roman.md');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const markdownContent = await response.text();
        console.log('Contenu chargé:', markdownContent.substring(0, 100) + '...');
        const parsedPages = parseBookContent(markdownContent);
        console.log('Pages parsées:', parsedPages.length);
        setPages(parsedPages);
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error);
        setError(error.message);
      }
    };

    loadBookContent();
  }, []);

  const handlePrevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(currentSpread - 1);
    }
  };

  const handleNextSpread = () => {
    if (currentSpread < Math.ceil(pages.length / 2) - 1) {
      setCurrentSpread(currentSpread + 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePrevSpread();
    } else if (event.key === 'ArrowRight') {
      handleNextSpread();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSpread]);

  if (error) {
    return <div className="error">Erreur de chargement: {error}</div>;
  }

  if (pages.length === 0) {
    return <div className="loading">Chargement...</div>;
  }

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = leftPageIndex + 1;

  return (
    <div className="chapter">
      <div className="book-container">
        <div className="book">
          <div className="page-spread">
            <div className="page left-page">
              {pages[leftPageIndex]?.map((item, index) => {
                if (item.type === 'title') {
                  return <h1 key={index}>{item.content}</h1>;
                } else if (item.type === 'subtitle') {
                  return <h2 key={index}>{item.content}</h2>;
                } else if (item.type === 'text') {
                  return <p key={index}>{item.content}</p>;
                } else if (item.type === 'empty') {
                  return <div key={index} className="empty-space"></div>;
                }
                return null;
              })}
            </div>
            {rightPageIndex < pages.length && (
              <div className="page right-page">
                {pages[rightPageIndex]?.map((item, index) => {
                  if (item.type === 'title') {
                    return <h1 key={index}>{item.content}</h1>;
                  } else if (item.type === 'subtitle') {
                    return <h2 key={index}>{item.content}</h2>;
                  } else if (item.type === 'text') {
                    return <p key={index}>{item.content}</p>;
                  } else if (item.type === 'empty') {
                    return <div key={index} className="empty-space"></div>;
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navigation">
        <button 
          className={`nav-button ${currentSpread === 0 ? 'disabled' : ''}`}
          onClick={handlePrevSpread}
          disabled={currentSpread === 0}
        >
          <img src={arrowLeft} alt="Pages précédentes" />
        </button>
        <span className="page-number">
          Pages {leftPageIndex + 1}-{Math.min(rightPageIndex + 1, pages.length)} sur {pages.length}
        </span>
        <button 
          className={`nav-button ${currentSpread >= Math.ceil(pages.length / 2) - 1 ? 'disabled' : ''}`}
          onClick={handleNextSpread}
          disabled={currentSpread >= Math.ceil(pages.length / 2) - 1}
        >
          <img src={arrowRight} alt="Pages suivantes" />
        </button>
      </div>
    </div>
  );
};

export default Chapter;
