import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/book');
  };

  return (
    <div className="home">
      <div className="content">
        <h1>Bienvenue dans</h1>
        <h2>Le dernier vol du corbeau</h2>
        <button onClick={handleStartClick}>Commencer</button>
      </div>
    </div>
  );
};

export default Home;
