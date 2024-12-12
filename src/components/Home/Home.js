import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Book from '../Book/Book';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Réduire le temps de chargement à 1 seconde
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {loading ? (
        <Spinner />
      ) : (
        <div className="home__content">
          <Book />
        </div>
      )}
    </div>
  );
};

export default Home;
