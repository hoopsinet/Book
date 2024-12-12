import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../../store/bookStore';
import ChapterNavigation from '../../components/ChapterNavigation/ChapterNavigation';
import './BookContent.css';

const BookContent = () => {
  const navigate = useNavigate();
  const { chapters, currentPage } = useBookStore();
  const chapter = chapters[currentPage];

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="book-pages">
      <button className="book-pages__close" onClick={handleClose}>
        ×
      </button>
      
      <div className="book-pages__content">
        <div className="book-pages__chapter-content">
          <h1 className="book-pages__title">{chapter.title}</h1>
          {chapter.image && (
            <div className="book-pages__image-container">
              <img 
                src={chapter.image} 
                alt={chapter.title}
                className="book-pages__image" 
              />
            </div>
          )}
          <div className="book-pages__text">
            <p>{chapter.content}</p>
          </div>
        </div>
      </div>

      <ChapterNavigation />
    </div>
  );
};

export default BookContent;
