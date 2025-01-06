import React from 'react';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import './Characters.css';

const Characters = () => {
  return (
    <div className="characters-container">
      <div className="character-wrapper left">
        <div className="character-card">
          <img src={adelineImage} alt="Adeline" className="character-image" />
          <div className="character-info">
            <h2>Adeline</h2>
            <p>Une élève studieuse et mystérieuse qui cache plus qu'elle ne le montre.</p>
          </div>
        </div>
      </div>
      <div className="character-wrapper right">
        <div className="character-card">
          <img src={ryuImage} alt="Ryu" className="character-image" />
          <div className="character-info">
            <h2>Ryu</h2>
            <p>Un lycéen solitaire et désabusé qui se remet en question sur son avenir.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
