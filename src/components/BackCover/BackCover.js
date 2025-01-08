import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackCover.css';
import backCoverImage from '../../assets/images/Dos.png';

const BackCover = () => {
  const navigate = useNavigate();

  return (
    <div className="quatrieme-couverture">
      <div className="back-cover-content">
        <img src={backCoverImage} alt="4ème de couverture" className="back-cover-image" />
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Page de couverture
      </button>
    </div>
  );
};

export default BackCover;
