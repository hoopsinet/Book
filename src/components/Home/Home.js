import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import coverImage from '../../assets/images/book-covers/couverture1.jpg';
import backImage from '../../assets/images/Dos.png';
import { backCoverText } from '../../content/backCover';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showBackCover, setShowBackCover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookClick = () => {
    if (!showBackCover) {
      navigate('/characters');
    }
  };

  const toggleCover = (e) => {
    e.stopPropagation();
    setShowBackCover(!showBackCover);
  };

  return (
    <div className="home">
      {loading ? (
        <Spinner />
      ) : (
        <div className="home__content">
          <div className="book-cover" onClick={handleBookClick}>
            {!showBackCover && (
              <div className="book-info">
                <h2>Le Dernier Vol du Corbeau</h2>
                <p className="author-name">Par Maxime Canda</p>
              </div>
            )}
            <img 
              src={showBackCover ? backImage : coverImage} 
              alt={showBackCover ? "Quatrième de couverture" : "Couverture du livre"} 
              className="cover-image" 
            />
            {showBackCover && (
              <div className="back-cover-text">
                <div className="back-cover-text-content">
                  {backCoverText}
                </div>
              </div>
            )}
            <button className="toggle-cover-btn" onClick={toggleCover}>
              {showBackCover ? "Voir la couverture" : "Voir la 4ème de couverture"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
