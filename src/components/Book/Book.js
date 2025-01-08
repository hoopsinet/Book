import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import coverImage from '../../assets/images/book-covers/couverture1.jpg';
import backImage from '../../assets/images/Dos.png';
import './Book.css';

const characterDescriptions = {
  ryu: 'Un lycéen solitaire et désabusé qui se remet en question sur son avenir.',
  adeline: 'Une élève studieuse et mystérieuse qui cache plus qu\'elle ne le montre.'
};

// Fonction pour parser le contenu du markdown
const parseContent = (markdown) => {
  const lines = markdown.split('\n');
  let mainTitle = '';
  let content = [];
  let currentText = '';

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      mainTitle = trimmedLine.replace('# ', '').toUpperCase();
    }
    else if (trimmedLine.startsWith('## ')) {
      if (currentText.trim()) {
        content.push({ type: 'text', content: currentText.trim() });
        currentText = '';
      }
      content.push({ type: 'chapter', content: trimmedLine.replace('## ', '') });
    }
    else if (trimmedLine === '') {
      if (currentText.trim()) {
        content.push({ type: 'text', content: currentText.trim() });
        currentText = '';
      }
    }
    else {
      currentText += (currentText ? ' ' : '') + trimmedLine;
    }
  });

  if (currentText.trim()) {
    content.push({ type: 'text', content: currentText.trim() });
  }

  return {
    mainTitle,
    content
  };
};

const romanContent = `
Le réveil sonna, à 6h. Comme tous les matins.

Ryu ouvrit péniblement les yeux. Le plafond grisâtre de sa chambre était la première chose qu'il voyait, un plafond qu'il connaissait par cœur. Chaque fissure, chaque tache, il les avait étudiées, comme si elles contenaient des secrets qu'il n'arriverait jamais à percer. Pourtant, ces marques immobiles étaient les seules choses qui ne semblaient jamais changer dans sa vie.

Sans un mot, il se tourna sur le côté et laissa échapper un soupir. Il ne voulait pas se lever. Mais il n'avait pas le choix. Ses pieds touchèrent le sol froid de sa petite chambre alors qu'il se levait, son corps agissant par automatisme. La salle de bain l'attendait, toujours la même routine, toujours les mêmes gestes.

Face au miroir, son propre reflet le dévisagea. Un visage sans éclat, marqué par la fatigue et le désintérêt. Ses cheveux châtains étaient ébouriffés, et de sombres cernes se creusaient sous ses yeux. Il passa un gant humide sur son visage, sans conviction, sentant à peine l'eau sur sa peau.

Un coup de peigne dans ses cheveux, rien de plus. Chaque geste était répété avec la même indifférence que la veille. Son corps savait quoi faire, mais son esprit était ailleurs, déjà distant, perdu dans des pensées qu'il n'arrivait pas à saisir.

Une veste à capuche grisâtre, une écharpe noire, ses baskets un peu usées, et surtout, ses écouteurs. Une fois qu'il les enfila, la musique envahit ses oreilles, étouffant les bruits du monde extérieur. C'était tout ce qu'il voulait : ne plus entendre. Ne plus sentir. Ne plus penser.

Il attrapa son sac, passa la porte de sa chambre et quitta la maison. À cet instant, il n'était plus qu'une ombre qui se déplaçait dans la ville, invisible aux yeux de tous.`;

const content = parseContent(romanContent);

const Book = () => {
  const navigate = useNavigate();

  const handleCoverClick = () => {
    navigate('/characters');
  };

  return (
    <div className="book-container" onClick={handleCoverClick}>
      <div className="book">
        <img src={coverImage} alt="Couverture" className="cover-image" />
      </div>
    </div>
  );
};

export default Book;
