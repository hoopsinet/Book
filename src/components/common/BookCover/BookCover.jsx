import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import coverImage from '../../../assets/images/cover';
import './BookCover.css';

const BookCover = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleStartJourney = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/characters');
    }, 300);
  };

  return (
    <div className="book-container">
      <div className={`book ${isOpen ? 'book-open' : ''}`}>
        <div className="page cover">
          <img 
            src={coverImage}
            alt="Couverture du livre"
            className="cover-image"
          />
          <div className="cover-title">
            <h1>Le dernier vol du corbeau</h1>
            <p>Par Maxime Hoopsinet</p>
          </div>
        </div>
        
        <div className="page content" onClick={handleClick}>
          <div className="page-content">
            <h1>Le dernier vol du corbeau</h1>
            <p>Livre écrit par Maxime Hoopsinet</p>
            <button 
              className="start-journey-btn"
              onClick={handleStartJourney}
            >
              Commencer le voyage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

BookCover.propTypes = {
  className: PropTypes.string,
};

export default BookCover;
