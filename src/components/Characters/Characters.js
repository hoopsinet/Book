import React from 'react';
import { useNavigate } from 'react-router-dom';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/ryu.jpeg';
import './Characters.css';

const characterDescriptions = {
  ryu: "Un lycéen solitaire et désabusé qui se remet en question sur son avenir.",
  adeline: "Une élève studieuse et mystérieuse qui cache plus qu'elle ne le montre."
};

const Characters = () => {
  const navigate = useNavigate();

  return (
    <div className="characters-container">
      <div className="navigation-buttons">
        <button className="cover-button" onClick={() => navigate('/')}>
          Couverture
        </button>
      </div>
      <div className="characters-book">
        <div className="characters-layout">
          <div className="character-page left">
            <img src={ryuImage} alt="Ryu" className="character-image" />
            <h2>Ryu</h2>
            <p>{characterDescriptions.ryu}</p>
          </div>
          <div className="character-page right">
            <img src={adelineImage} alt="Adeline" className="character-image" />
            <h2>Adeline</h2>
            <p>{characterDescriptions.adeline}</p>
            <button className="start-button" onClick={() => navigate('/chapter1')}>
              Commencer le livre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
