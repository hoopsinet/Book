import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Characters from './components/Characters/Characters';
import Chapter from './components/Chapter/Chapter';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chapter1" element={<Chapter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
