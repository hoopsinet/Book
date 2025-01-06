import React, { useState } from 'react';
import './Book.css';
import coverImage from '../../assets/images/book-covers/couverture1.jpg';
import backImage from '../../assets/images/Dos.png';

const Book = ({ onReadClick, onCharactersClick }) => {
  const [showBackCover, setShowBackCover] = useState(false);

  const handleBackCoverClick = () => {
    setShowBackCover(!showBackCover);
  };

  const handleReadClick = () => {
    if (onReadClick) {
      onReadClick();
    }
  };

  const handleCharactersClick = () => {
    if (onCharactersClick) {
      onCharactersClick();
    }
  };

  return (
    <div className="book-container">
      <div className={`book ${showBackCover ? 'show-back' : ''}`}>
        {!showBackCover ? (
          <div className="front-cover">
            <img 
              src={coverImage}
              alt="Couverture"
              className="cover-image"
            />
            <div className="cover-content">
              <h1>Le dernier vol du corbeau</h1>
              <p className="author">Par Maxime Canda</p>
            </div>
            <div className="buttons">
              <button onClick={handleBackCoverClick}>4ème de couverture</button>
              <button onClick={handleCharactersClick}>Personnages</button>
              <button onClick={handleReadClick}>Lire</button>
            </div>
          </div>
        ) : (
          <div className="back-cover">
            <img 
              src={backImage}
              alt="Illustration de couverture"
              className="back-image"
            />
            <div className="back-content">
              <h2>Synopsis</h2>
              <div className="synopsis">
                <p>
                  Dans un monde où la conformité règne en maître, Ryu, un adolescent désabusé, se retrouva piégé dans une routine quotidienne morne et dépourvue de sens. Au début de l'histoire, il se lèva chaque matin dans une chambre qui témoigna de sa lassitude, se préparant à affronter une vie scolaire où il se sent invisible et rejeté. À travers ses yeux, nous découvrons un lycée qui ressemble plus à une prison qu'à un lieu d'apprentissage, où les rêves sont étouffés par le mépris des enseignants et les ricanements des camarades.
                </p>
                <p>
                  Cependant, un événement inattendu vient bouleverser cette monotonie : lorsque son camarade Max est humilié par leur professeur, Ryu ressent une impulsion irrépressible de défendre celui qui, comme lui, est marginalisé. Ce geste de bravoure, bien que désintéressé, entraîne des conséquences dramatiques. La confrontation avec M. Lefèvre, un enseignant autoritaire, le conduit directement dans le bureau du directeur, où il se voit imposer une sanction pour avoir osé s'opposer à l'autorité.
                </p>
                <p>
                  Le conseil de discipline est devenu le théâtre d'un affrontement non seulement entre Ryu et les figures d'autorité, mais aussi entre son désir de justice et la peur de la répression. Ses parents, tout en étant perplexes face à la décision du directeur, réalisent que leur fils se bat contre un système qui refuse de le comprendre. Ryu se sent trahi par le lieu qui devrait être un sanctuaire d'apprentissage et d'égalité, et il commence à envisager ce que signifie vraiment l'égalité et la solidarité.
                </p>
                <p>
                  Ce premier chapitre de son voyage pose les bases d'une quête de vérité et de justice, où Ryu devra non seulement lutter contre l'injustice, mais aussi affronter ses propres démons intérieurs pour définir qui il est réellement et quel rôle il souhaite jouer dans un monde qui tend à le réduire au silence.
                </p>
              </div>
              <div className="publisher-info">
                <p className="isbn">ISBN : 978-2-XXXXX-XXX-X</p>
                <p> 2024 Éditions Example</p>
              </div>
            </div>
            <div className="buttons">
              <button onClick={handleBackCoverClick}>Voir la couverture</button>
              <button onClick={handleCharactersClick}>Personnages</button>
              <button onClick={handleReadClick}>Lire</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
