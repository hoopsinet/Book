import React from 'react';
import BookCover from '../common/BookCover/BookCover';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home__book-cover">
        <BookCover />
      </div>
    </div>
  );
};

export default Home;
