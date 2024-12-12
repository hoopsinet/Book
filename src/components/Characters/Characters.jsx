import React from 'react';
import adelineImage from '../../assets/images/characters';
import './Characters.css';

const Characters = () => {
  return (
    <div className="characters-container">
      <div className="character-wrapper left">
        <div className="character-card">
          <img src={adelineImage} alt="Adeline" className="character-image" />
          <div className="character-info">
            <h2>Adeline</h2>
            <p>Une jeune fille pleine de mystères...</p>
          </div>
        </div>
      </div>
      <div className="character-wrapper right">
        <div className="character-card">
          <div className="character-placeholder">
            <div className="placeholder-text">Image à venir</div>
          </div>
          <div className="character-info">
            <h2>Ryu</h2>
            <p>Un personnage énigmatique...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
