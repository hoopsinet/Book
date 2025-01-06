import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackCover.css';

const BackCover = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/book');
  };

  return (
    <div className="back-cover">
      <div className="back-cover-content">
        <h2>Synopsis</h2>
        <div className="synopsis">
          <p>
            Dans un Japon contemporain où la tradition côtoie la modernité, Ryu, un lycéen solitaire et désabusé, 
            traverse ses journées comme une ombre, invisible aux yeux de tous. Sa routine monotone est bouleversée 
            le jour où il rencontre Adeline, une mystérieuse élève française fraîchement arrivée dans son lycée.
          </p>
          <p>
            Alors que leurs chemins se croisent, des événements étranges commencent à se produire. Des phénomènes 
            inexplicables, des rêves troublants et des coïncidences qui n'en sont peut-être pas. Et si le destin 
            qui les avait réunis cachait un secret plus profond, plus ancien, enraciné dans les légendes japonaises ?
          </p>
          <p>
            Entre mystère et réalité, "Le dernier vol du corbeau" est une histoire qui explore les thèmes de 
            l'identité, de la solitude et de la connexion, dans un monde où le surnaturel n'est peut-être pas 
            si éloigné qu'on le pense.
          </p>
        </div>
        <button onClick={handleBackClick} className="back-button">
          Retour
        </button>
      </div>
    </div>
  );
};

export default BackCover;
