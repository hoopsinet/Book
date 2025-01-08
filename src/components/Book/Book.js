import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import coverImage from '../../assets/images/book-covers/couverture1.jpg';
import backImage from '../../assets/images/Dos.png';
import './Book.css';
import romanContent from '../../content/roman.md';

const characterDescriptions = {
  ryu: 'Un lycéen solitaire et désabusé qui se remet en question sur son avenir.',
  adeline: 'Une élève studieuse et mystérieuse qui cache plus qu\'elle ne le montre.'
};

// Fonction pour parser le contenu du markdown
const parseContent = (markdown) => {
  const lines = markdown.split('\n');
  let chapters = [];
  let currentChapter = null;
  let currentText = '';

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('## ')) {
      // Si on a déjà un chapitre en cours, on le sauvegarde
      if (currentChapter) {
        chapters.push({
          title: currentChapter,
          content: currentText.trim()
        });
      }
      // On commence un nouveau chapitre
      currentChapter = trimmedLine.replace('## ', '');
      currentText = '';
    } else {
      // On ajoute le texte au chapitre en cours
      if (currentChapter && trimmedLine) {
        currentText += trimmedLine + '\n\n';
      }
    }
  });

  // N'oublions pas d'ajouter le dernier chapitre
  if (currentChapter) {
    chapters.push({
      title: currentChapter,
      content: currentText.trim()
    });
  }

  return chapters;
};

const Book = () => {
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger le contenu du fichier markdown
    fetch(romanContent)
      .then(response => response.text())
      .then(text => {
        const parsedChapters = parseContent(text);
        setChapters(parsedChapters);
      })
      .catch(error => {
        console.error('Erreur lors du chargement du contenu:', error);
        setChapters([{
          title: 'Erreur de chargement',
          content: 'Impossible de charger le contenu du livre.'
        }]);
      });
  }, []);

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const currentChapter = chapters[currentChapterIndex];

  return (
    <div className="book-container">
      <div className="book">
        {currentChapter ? (
          <div className="chapter">
            {currentChapterIndex === chapters.length - 1 ? (
              // Dernière page avec la même mise en page que la couverture
              <img src={backImage} alt="Dernière page" className="cover-image" />
            ) : (
              <>
                <h2>{currentChapter.title}</h2>
                <div className="chapter-content">
                  {currentChapter.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="navigation-buttons">
                  <button 
                    onClick={handlePreviousChapter}
                    disabled={currentChapterIndex === 0}
                  >
                    <FaChevronLeft /> Chapitre précédent
                  </button>
                  <button 
                    onClick={handleNextChapter}
                    disabled={currentChapterIndex === chapters.length - 1}
                  >
                    Chapitre suivant <FaChevronRight />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <img src={coverImage} alt="Couverture" className="cover-image" onClick={() => setCurrentChapterIndex(0)} />
        )}
      </div>
    </div>
  );
};

export default Book;
