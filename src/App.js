import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Book from './components/Book/Book';
import Characters from './components/Characters/Characters';
import Chapter from './components/Chapter/Chapter';
import BackCover from './components/BackCover/BackCover';
import './styles/App.css';

function BookWrapper() {
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate('/chapter');
  };

  const handleCharactersClick = () => {
    navigate('/characters');
  };

  return (
    <Book 
      onReadClick={handleReadClick}
      onCharactersClick={handleCharactersClick}
    />
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookWrapper />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/backcover" element={<BackCover />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
