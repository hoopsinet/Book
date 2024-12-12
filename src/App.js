import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BookContent from './pages/BookContent/BookContent';
import Characters from './components/Characters/Characters';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/book" element={<BookContent />} />
      </Routes>
    </Router>
  );
};

export default App;
