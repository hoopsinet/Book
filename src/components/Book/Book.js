import React, { useState } from 'react';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import coverImage from '../../assets/images/cover';
import backImage from '../../assets/images/Dos.png';
import './Book.css';

const Book = () => {
  const [bookState, setBookState] = useState('cover');
  const [currentPage, setCurrentPage] = useState(0);

  const handleStateChange = (newState) => {
    if (newState === 'forward') {
      setBookState('characters');
    } else if (newState === 'story') {
      setBookState('story');
    } else if (newState === 'back') {
      if (bookState === 'story') {
        setBookState('characters');
      } else if (bookState === 'characters' || bookState === 'backcover') {
        setBookState('cover');
      }
    } else if (newState === 'backcover') {
      setBookState('backcover');
    }
  };

  const handlePageTurn = (direction) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const storyPages = [
    {
      title: "Prologue : Le Réveil de Ryu",
      leftContent: `Le réveil sonna, à 6h. Comme tous les matins.
Ryu ouvrit péniblement les yeux. Le plafond grisâtre de sa chambre était la première chose qu'il voyait, un plafond qu'il connaissait par cœur. Chaque fissure, chaque tache, il les avait étudiées, comme si elles contenaient des secrets qu'il n'arriverait jamais à percer. Pourtant, ces marques immobiles étaient les seules choses qui ne semblaient jamais changer dans sa vie. Sans un mot, il se tourna sur le côté et laissa échapper un soupir. Il ne voulait pas se lever. Mais il n'avait pas le choix. Ses pieds touchèrent le sol froid de sa petite chambre alors qu'il se levait, son corps agissant par automatisme. La salle de bain l'attendait, toujours la même routine, toujours les mêmes gestes. Face au miroir, son propre reflet le dévisagea. Un visage sans éclat, marqué par la fatigue et le désintérêt. Ses cheveux châtains étaient ébouriffés, et de sombres cernes se creusaient sous ses yeux. Il passa un gant humide sur son visage, sans conviction, sentant à peine l'eau sur sa peau. Un coup de peigne dans ses cheveux, rien de plus. Chaque geste était répété avec la même indifférence que la veille. Son corps savait quoi faire, mais son esprit était ailleurs, déjà distant, perdu dans des pensées qu'il n'arrivait pas à saisir.`,
      rightContent: `Une veste à capuche grisâtre, une écharpe noire, ses baskets un peu usées, et surtout, ses écouteurs. Une fois qu'il les enfila, la musique envahit ses oreilles, étouffant les bruits du monde extérieur. C'était tout ce qu'il voulait : ne plus entendre. Ne plus sentir. Ne plus penser. Il attrapa son sac, passa la porte de sa chambre et quitta la maison. À cet instant, il n'était plus qu'une ombre qui se déplaçait dans la ville, invisible aux yeux de tous.`
    }
  ];

  const characters = [
    {
      name: 'Adeline',
      image: adelineImage,
      description: 'Une jeune fille mystérieuse et intelligente.'
    },
    {
      name: 'Ryu',
      image: ryuImage,
      description: 'Un adolescent désabusé et solitaire.'
    }
  ];

  const renderCharacterPage = (character) => {
    return (
      <div className="character-page">
        <img 
          src={character.image} 
          alt={character.name}
          className="character-image"
        />
        <div className="character-description">
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (bookState) {
      case 'cover':
        return (
          <div className="book-cover-container">
            <div className="book-cover" onClick={() => handleStateChange('forward')}>
              <div className="cover-image" style={{ backgroundImage: `url(${coverImage})` }}></div>
              <div className="cover-content">
                <h1>Le Dernier Vol du Corbeau</h1>
                <p>Un roman de mystère et d'aventure</p>
              </div>
            </div>
            <button className="view-back-cover" onClick={() => handleStateChange('backcover')}>
              Voir le résumé
            </button>
          </div>
        );

      case 'backcover':
        return (
          <div className="book-back-container">
            <div className="book-back">
              <div className="back-image" style={{ backgroundImage: `url(${backImage})` }}></div>
              <div className="back-content">
                <h2>Synopsis</h2>
                <div className="synopsis">
                  <p>Dans un monde où les secrets du passé refont surface, suivez l'histoire d'Adeline et Ryu alors qu'ils tentent de percer le mystère du dernier vol du corbeau. Une aventure qui les mènera aux confins de leurs propres limites, où la frontière entre le réel et l'imaginaire devient de plus en plus floue.</p>
                </div>
                <button className="return-button" onClick={() => handleStateChange('back')}>
                  Retourner à la couverture
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'intro':
        return (
          <div className="book-open">
            <div className="page page-left">
              <div className="page-content">
                <h1>Le dernier vol du corbeau</h1>
                <p>Par Maxime Hoopsinet</p>
              </div>
            </div>
            <div className="page page-right">
              <div className="page-content">
                <div className="continue-button" onClick={() => handleStateChange('forward')}>
                  Cliquer pour continuer l'histoire
                </div>
              </div>
            </div>
            <button className="back-button" onClick={() => handleStateChange('back')}>
              Retour
            </button>
          </div>
        );
      
      case 'characters':
        return (
          <div className="book-open">
            <button className="back-button" onClick={() => handleStateChange('back')}>
              ← Retour
            </button>
            <div className="page page-left">
              {renderCharacterPage(characters[0])}
            </div>
            <div className="page page-right">
              {renderCharacterPage(characters[1])}
            </div>
            <button className="start-story-button" onClick={() => handleStateChange('story')}>
              Commencer
            </button>
          </div>
        );

      case 'story':
        return renderStoryPages();
    }
  };

  const renderStoryPages = () => {
    return (
      <div className="book-open">
        <button className="back-button" onClick={() => handleStateChange('back')}>
          ← Retour
        </button>
        {currentPage > 0 && (
          <button 
            className="page-arrow left"
            onClick={() => handlePageTurn('prev')}
          >
            ←
          </button>
        )}
        <div className="page page-left">
          <div className="page-content story-page">
            <h2>{storyPages[currentPage].title}</h2>
            <div className="story-text">
              {storyPages[currentPage].leftContent}
            </div>
            <div className="page-number">{currentPage * 2 + 1}</div>
          </div>
        </div>
        <div className="page page-right">
          <div className="page-content story-page">
            <div className="story-text">
              {storyPages[currentPage].rightContent}
            </div>
            <div className="page-number">{(currentPage * 2) + 2}</div>
          </div>
        </div>
        {currentPage < storyPages.length - 1 && (
          <button 
            className="page-arrow right"
            onClick={() => handlePageTurn('next')}
          >
            →
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="book-container">
      {renderContent()}
    </div>
  );
};

export default Book;
