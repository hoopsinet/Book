import React, { useState, useEffect } from 'react';
import adelineImage from '../../assets/images/Adeline.jpeg';
import ryuImage from '../../assets/images/book-covers/Ryu.jpeg';
import coverImage from '../../assets/images/cover';
import backImage from '../../assets/images/Dos.png';
import './Book.css';

const Book = () => {
  const [bookState, setBookState] = useState('cover');
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turningDirection, setTurningDirection] = useState(null);
  const [cachedPages, setCachedPages] = useState(null);

  useEffect(() => {
    if (!cachedPages) {
      const allPages = getAllPages();
      setCachedPages(allPages);
    }
  }, []);

  const handleStateChange = (newState) => {
    console.log('Current state:', bookState, 'New state:', newState);
    if (newState === 'forward') {
      if (bookState === 'cover') {
        setBookState('characters');
      } else if (bookState === 'characters') {
        setBookState('story');
        setCurrentPage(0);
      }
    } else if (newState === 'back') {
      if (bookState === 'story') {
        setBookState('characters');
      } else if (bookState === 'characters') {
        setBookState('cover');
      } else if (bookState === 'backcover') {
        setBookState('cover');
      }
    } else if (newState === 'backcover') {
      setBookState('backcover');
    }
  };

  const handlePageTurn = (direction) => {
    if (isPageTurning) return;    
    const pages = cachedPages ? cachedPages.pages : getAllPages().pages;
     
    if (direction === 'prev' && currentPage > 0) {
      setIsPageTurning(true);
      setTurningDirection(direction);
      setCurrentPage(currentPage - 2);
      setTimeout(() => {
        setIsPageTurning(false);
        setTurningDirection(null);
      }, 150);
    } else if (direction === 'next' && currentPage + 2 < pages.length) {
      setIsPageTurning(true);
      setTurningDirection(direction);
      setCurrentPage(currentPage + 2);
      setTimeout(() => {
        setIsPageTurning(false);
        setTurningDirection(null);
      }, 150);
    }
   };

  const splitTextIntoPages = (text) => {
    if (!text) return [];
    
    // Créer un élément temporaire pour mesurer le texte
    const tempElement = document.createElement('div');
    tempElement.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: 520px; // 600px - 2 * 40px (padding)
      font-size: 16px;
      line-height: 1.8;
      font-family: Georgia, serif;
      text-align: justify;
      padding: 40px;
      height: 720px; // 800px - 2 * 40px (padding)
    `;
    document.body.appendChild(tempElement);

    const words = text.split(/\s+/);
    const pages = [];
    let currentPage = [];
    let currentText = '';

    for (let word of words) {
      const testText = currentText + (currentText ? ' ' : '') + word;
      tempElement.textContent = testText;

      if (tempElement.scrollHeight > tempElement.clientHeight) {
        // Chercher le dernier point pour couper à la fin d'une phrase
        const lastText = currentPage.join(' ');
        const lastPeriodIndex = lastText.lastIndexOf('.');
        
        if (lastPeriodIndex !== -1 && lastPeriodIndex > lastText.length - 30) {
          const beforePeriod = lastText.substring(0, lastPeriodIndex + 1);
          const afterPeriod = lastText.substring(lastPeriodIndex + 1).trim();
          
          pages.push(beforePeriod.trim());
          currentPage = afterPeriod ? [afterPeriod, word] : [word];
          currentText = currentPage.join(' ');
        } else {
          pages.push(currentPage.join(' '));
          currentPage = [word];
          currentText = word;
        }
      } else {
        currentPage.push(word);
        currentText = testText;
      }
    }

    if (currentPage.length > 0) {
      pages.push(currentPage.join(' '));
    }

    document.body.removeChild(tempElement);
    return pages;
  };

  const getAllPages = () => {
    if (cachedPages) return cachedPages;

    const prologuePages = splitTextIntoPages(bookContent.prologue.text);
    const chapter1Pages = splitTextIntoPages(bookContent.chapter1.text);
    const chapter2Pages = splitTextIntoPages(bookContent.chapter2.text);
    const chapter3Pages = splitTextIntoPages(bookContent.chapter3.text);
    
    return {
      pages: [...prologuePages, ...chapter1Pages, ...chapter2Pages, ...chapter3Pages],
      prologueLength: prologuePages.length,
      chapter1Length: prologuePages.length + chapter1Pages.length,
      chapter2Length: prologuePages.length + chapter1Pages.length + chapter2Pages.length
    };
  };

  const synopsis = `Dans un monde où la conformité règne en maître, Ryu, un adolescent désabusé, se retrouve piégé dans une routine quotidienne morne et dépourvue de sens. Au début de l'histoire, il se lève chaque matin dans une chambre qui témoigne de sa lassitude, se préparant à affronter une vie scolaire où il se sent invisible et rejeté. À travers ses yeux, nous découvrons un lycée qui ressemble plus à une prison qu'à un lieu d'apprentissage, où les rêves sont étouffés par le mépris des enseignants et les ricanements des camarades.

Cependant, un événement inattendu vient bouleverser cette monotonie : lorsque son camarade Max est humilié par leur professeur, Ryu ressent une impulsion irrépressible de défendre celui qui, comme lui, est marginalisé. Ce geste de bravoure, bien que désintéressé, entraîne des conséquences dramatiques. La confrontation avec M. Lefèvre, un enseignant autoritaire, le conduit directement dans le bureau du directeur, où il se voit imposer une sanction pour avoir osé s'opposer à l'autorité.`;

  const bookContent = {
    prologue: {
      title: "Prologue : Le Réveil de Ryu",
      text: `Le réveil sonna, à 6h. Comme tous les matins. Ryu ouvrit péniblement les yeux. Le plafond grisâtre de sa chambre était la première chose qu'il voyait, un plafond qu'il connaissait par cœur. Chaque fissure, chaque tache, il les avait étudiées, comme si elles contenaient des secrets qu'il n'arriverait jamais à percer. Pourtant, ces marques immobiles étaient les seules choses qui ne semblaient jamais changer dans sa vie. Sans un mot, il se tourna sur le côté et laissa échapper un soupir. Il ne voulait pas se lever. Mais il n'avait pas le choix. Ses pieds touchèrent le sol froid de sa petite chambre alors qu'il se levait, son corps agissant par automatisme. La salle de bain l'attendait, toujours la même routine, toujours les mêmes gestes. Face au miroir, son propre reflet le dévisagea. Un visage sans éclat, marqué par la fatigue et le désintérêt. Ses cheveux châtains étaient ébouriffés, et de sombres cernes se creusaient sous ses yeux. Il passa un gant humide sur son visage, sans conviction, sentant à peine l'eau sur sa peau. Un coup de peigne dans ses cheveux, rien de plus. Chaque geste était répété avec la même indifférence que la veille. Son corps savait quoi faire, mais son esprit était ailleurs, déjà distant, perdu dans des pensées qu'il n'arrivait pas à saisir. Une veste à capuche grisâtre, une écharpe noire, ses baskets un peu usées, et surtout, ses écouteurs. Une fois qu'il les enfila, la musique envahit ses oreilles, étouffant les bruits du monde extérieur. C'était tout ce qu'il voulait : ne plus entendre. Ne plus sentir. Ne plus penser. Il attrapa son sac, passa la porte de sa chambre et quitta la maison. À cet instant, il n'était plus qu'une ombre qui se déplaçait dans la ville, invisible aux yeux de tous.`
    },
    chapter1: {
      title: "Chapitre 1 ",
      text: `Ryu descendit les rues familières, toujours les mêmes, toujours aussi vides de sens. Les bâtiments ternes défilaient à sa gauche et à sa droite, mais ils semblaient flous, presque irréels. Les visages qu’il croisait n’étaient que des silhouettes anonymes, les voitures qui passaient, un bourdonnement lointain à travers la musique qui résonnait dans ses oreilles. Le lycée était juste là, au bout du chemin, et pourtant, il lui semblait toujours aussi distant, comme une prison dont il ne pourrait jamais vraiment sortir. Il franchit les grilles, jeta un coup d’œil rapide à l’horloge au-dessus de l’entrée : il était encore en avance. C’était toujours le même scénario.
En entrant dans la salle de classe, Ryu se dirigea automatiquement vers sa place habituelle, tout au fond, là où personne ne prêtait attention à lui. Il s’assit, posa son sac à ses pieds, sortit son carnet et son stylo, mais ne fit aucun effort pour paraître intéressé. Les minutes passaient, les professeurs parlaient, mais leurs voix étaient comme des échos lointains. Ryu écoutait, ou du moins il retenait l’essentiel, juste assez pour rester à flot, pour maintenir une moyenne suffisante. Mais au fond de lui, il se demandait à quoi bon. À quoi bon s’investir quand on vous disait que vous n’aviez aucun avenir ? Que votre branche n’avait rien à offrir ? C’était ce que le conseiller d’orientation lui avait dit il y a quelques mois, et ces mots se répétaient en boucle dans sa tête.
« Il n’y avait plus vraiment de débouchés dans ce secteur, tu sais. Tu devrais peut-être penser à autre chose… »
Penser à quoi ? À quoi pouvait-il bien penser quand tout semblait déjà figé ?
Ryu baissa les yeux vers son carnet et griffonna quelques lignes sans véritable intérêt. Autour de lui, certains élèves discutaient, d'autres semblaient impliqués, mais lui... Lui se sentait déconnecté. Il ne faisait pas partie de leur monde. Ils riaient, ils bavardaient de leurs projets pour le week-end, mais tout cela lui semblait lointain, comme un univers auquel il n’appartiendrait jamais. La sonnerie retentit enfin. Il se leva sans hâte, glissa son carnet dans son sac et quitta la salle sans un regard en arrière. Le couloir se remplit de visages familiers, des visages qu’il voyait tous les jours mais qu’il ne connaissait pas. Il traversa la foule, invisible, tout comme le reste de la journée.
Ryu s’assit à l’arrière de la salle de classe, là où il se sentait le plus invisible. La leçon s'écoula lentement, mais ce jour-là, quelque chose était différent. L’enseignant, M. Lefèvre, était de mauvaise humeur, et cela se ressentait dans l’atmosphère oppressante qui régnait dans la pièce. Les mots du professeur devinrent une série d'attaques déguisées. Ryu observait, frustré, alors qu’un camarade de classe, Max, se faisait rabrouer pour avoir posé une question. Les autres élèves riaient, et Ryu sentit un nœud se former dans son estomac. Pourquoi tout le monde acceptait-il cette humiliation silencieusement ? Il leva finalement la main, une impulsion soudaine qui le surprit lui-même.
« Monsieur, ce n'est pas juste de parler comme ça à Max. Ce n’est pas une mauvaise question. »
Les regards se tournèrent vers lui, et il sentit le poids des yeux de ses camarades sur lui. M. Lefèvre, raide comme un piquet, fixa Ryu avec une expression méprisante. « Tu ferais mieux de te concentrer sur ton propre travail, Ryu. Tout le monde sait que tu n’es pas un bon élève. Tu as assez de mal à suivre, alors pourquoi t’immiscer dans les affaires des autres ? »
Le sang de Ryu bouillait. Il savait qu'il avait raison, mais les mots du professeur étaient comme des fléchettes acérées. Une bouffée de colère monta en lui, mais il se força à rester calme. Il n’était pas question de céder à cette pression.
« Je pense qu’il est important que vous vous rappeliez que votre rôle n’est pas de rabaisser, mais d’enseigner », lâcha-t-il, essayant de garder sa voix posée.
M. Lefèvre, hors de lui, le fixa d’un regard noir. « Tu es un rebelle, Ryu. Un rebelle qui se permet de répondre à un professeur ne sera pas toléré dans cette école. Suis-moi dans le bureau du directeur, maintenant. »
Une fois dans le bureau du directeur, Ryu se retrouva face à ce qu’il considérait comme un tyran. Le directeur, un homme imposant avec une voix tonitruante, le regarda de haut. « Ryu, tu es ici parce que tu ne sais pas te tenir. Avec tes résultats aussi médiocres, tu ne devrais même pas avoir ta place ici. Sois déjà content qu'on t'ait accepté. Fais-toi discret ; il serait regrettable que tu sois forcé de quitter le lycée pour si peu. »
Ryu, plein d’audace et d’insouciance, le défia du regard. « Un rebelle, monsieur ? Je ne fais que défendre un camarade. Ce n'est pas en rabaissant les élèves qu'on enseigne. »
L’homme le fixa avec une intensité qui aurait pu faire reculer n’importe quel élève. Mais Ryu ne fléchit pas. Pour lui, c’était un combat, un acte de bravoure face à l’injustice. Se levant, il déclara : « Vous abusez de votre pouvoir. Vous n’êtes pas un éducateur, vous êtes un tyran, et vous ne m’impressionnez pas. Comment pouvez-vous savoir ce qui est bon pour des élèves alors que vous n’avez vous-même pas d’enfants ? »
À cet instant, il se rendit compte qu'il était peut-être allé trop loin. La colère avait parlé trop fort… trop tard ! Le directeur le regarda avec un mélange de mépris et de surprise. Ryu sentit les chaînes se resserrer autour de lui alors qu’il réalisait que son audace pourrait avoir des conséquences qu’il n’avait pas anticipées.
Le directeur annonça un conseil de discipline pour ses "menaces", et ce moment d’insouciance le figea un instant, tandis qu’il comprenait la gravité de sa situation.
De retour à la maison, Ryu était énervé et vexé de ce qui venait d’arriver... Réprimé pour avoir voulu défendre son camarade de classe ! Il commençait à entrevoir, à ce moment-là, que ne pas être dans le moule ne lui apporterait que des problèmes. Mais à quoi bon ressembler à tout le monde lorsqu’on n’était pas en accord avec le système imposé ? Il se sentit aspiré, comme s’il se laissait tomber sur son lit, réfléchissant tout en regardant par la fenêtre la nuit qui tombait doucement. Il y posa sa main et admira les lumières qui s’allumaient.
Le jour du conseil arriva. Ryu se prépara machinalement pour aller au lycée, comme à son habitude. Il répéta le même rituel matinal, écouteurs aux oreilles, pour s’offrir une brève évasion avant d’entrer par le grand portail. Il respira profondément et se répéta : « Après tout, je n’ai rien fait de mal ! » Il tenta de se rassurer comme il pouvait. Dans le couloir, il croisa M. Lefèvre, qui esquissa un sourire narquois, mais il l’ignora et continua d’avancer vers son cours de sport.
Le professeur M. Takashi, pendant son cours, annonça à Ryu qu’il viendrait lors de son conseil. Car, après tout, à ses yeux, Ryu était un bon élève. Il ne perturbait pas son cours, participait d’ailleurs et affichait d’excellents résultats, avec une moyenne de 19/20. Il était l’un des meilleurs qu’il ait eus jusqu’à présent.
L’heure du cours de sport se termina. Ryu remit ses écouteurs, mais le stress l’envahissait, se manifestant par une pression sur son torse. Il s’imaginait comme un prisonnier sur le chemin du jugement final. Le doute l’habitait, et il se disait : « Pourquoi l’avoir aidé, après tout ? Personne ne l’aurait fait pour moi ! » Il suffisait de voir le regard de certains élèves, surtout celui de la déléguée de classe, qui serait présente lors du conseil. Il lui avait déjà parlé, mais sans plus. Ils n’étaient pas du même monde.
L'heure était arrivée. Ryu se dirigea vers la salle où il était attendu par le professeur, le directeur, la déléguée de sa classe et même ses parents. Soudain, le professeur de sport se joignit à eux, à la surprise du principal. On pouvait sentir la tension monter d'un cran.
Le principal commença : « Ryu, nous sommes ici car tu t'es adressé de façon incorrecte à ton professeur. De plus, tu t'es permis de porter un jugement à mon encontre. Reconnais-tu les faits ? »
Ryu fronça les sourcils et, de manière instinctive, rétorqua : « Je reconnais seulement le fait d'avoir fait part d'une inégalité, rien d'autre. »
Le directeur, satisfait de sa réponse, sortit les résultats des différents contrôles de Ryu de l'année et les présenta à ses parents. « Vous voyez comme votre fils ne fait pas d'efforts ? Il a tout juste la moyenne dans notre établissement. Il devrait se concentrer sur ses études. »
Le professeur de sport, agacé, prit la parole : « Je connais bien Ryu. Il est sérieux, jamais en retard et impliqué. Il ne râle pas lorsqu'on lui demande quelque chose. J'ai du mal à imaginer qu'il ait été aussi déplacé. »
Le directeur l'interrompit, lui disant qu'il n'était pas convié à ce conseil et qu'en tant que professeur de sport, il n'avait pas son mot à dire.
La déléguée de classe prit la parole, décrivant Ryu en classe : « Il ne participe que lorsqu'on l'invite à le faire, il est discret et passe la plupart de son temps la tête sur ses bras croisés sur la table. »
Ryu se rendit compte de la tournure que prenait le conseil. Il devenait le véritable bouc émissaire, un exemple pour tous ceux qui, comme lui, n’acceptaient pas cette réalité où l’on rabaissait les élèves médiocres ou timides. Il se sentait coincé, condamné à devenir comme tout le monde ou voué à disparaître et devenir le bègue.
Ses parents le regardaient silencieusement, sachant qu'il n'était pas très travailleur mais n’ayant jamais eu de problèmes auparavant. Sa mère lui adressa un regard complice. Ryu sentit des maillons de ses chaînes se fissurer petit à petit, comme s’il était libéré d’une partie du poids qu’il portait. Il prit la parole : « J’ai des résultats moyens, oui, mais pas en dessous. Je sais m’investir quand il le faut. Quant à mon comportement... »
Le directeur l’interrompit : « J’ai pris ma décision suite aux événements. Tu seras renvoyé de l’établissement pendant trois jours. Prends le temps de réfléchir à tes actes. »
À ce moment-là, quelque chose se brisa chez Ryu. Trahi, sali, abandonné par ce qui devait être l’endroit où les jeunes se sentaient le plus en sécurité, un lieu pour tous, tous égaux, où l’on devait être soutenu… Rien de tout ça.
Les parents de Ryu prirent alors la parole, ne comprenant pas cette décision. Ils voyaient bien que tout était déjà joué d’avance pour lui. Le principal avait pris sa décision avant même le conseil de discipline ; ce n’était qu’une façade pour pouvoir user de son privilège. La déléguée, avec un sourire satisfait, ajouta que Ryu rêvait sans cesse, ses résultats moyens n’étant qu’une excuse. Le vrai problème, c’était que Ryu avait osé exprimer son opinion, et cela, ça ne plaisait pas.
Ainsi s’acheva le conseil de Ryu…
.`
    },
    chapter2: {
      title: "Chapitre 2 ",
      text: `Ryu se tenait près des escaliers du lycée, observant les élèves qui se pressaient autour de lui. Parmi eux, il y avait la déléguée. Avec son manteau blanc à capuche en fourrure, ses longs cheveux noirs et ses yeux marrons pétillants, elle attirait les regards. Les garçons semblaient l'admirer, et elle était bien consciente de son influence. Pour Ryu, elle était fascinante mais lointaine, comme une étoile brillante dans un ciel sombre.

Au début de l'année de seconde, il n'osait pas lui parler. Il se contentait de l'observer de loin, admirant la façon dont elle charmait ceux qui l'entouraient. Puis, au fil des semaines, leur chemin s'était croisé plus souvent. Ils avaient commencé à échanger des mots, d'abord sur des devoirs, puis des discussions plus légères lorsqu'ils se retrouvaient avec d'autres élèves après les cours.

Il se remémore un après-midi, assis sur un banc avec un groupe, la déléguée riant à une blague lancée par un de ses camarades. Ryu avait alors pris son courage à deux mains. Il avait osé lui demander son avis sur une chanson qu'il aimait. À sa grande surprise, elle avait souri, même si elle avait rapidement rétorqué que ce n'était pas son style.

Les mois passèrent, et il se sentit un peu plus à l'aise. Ils avaient partagé des moments de complicité, mais Ryu réalisait peu à peu qu'ils ne partageaient pas les mêmes visions. La déléguée était convaincue que l'apparence et la popularité importaient plus que les qualités réelles d'une personne. Cela le gênait.

Ryu se rappelait de leurs échanges sur la musique. Il préférait les sons plus alternatifs, tandis qu'elle adorait les hits commerciaux. Ils parlaient aussi des autres élèves, et Ryu sentait que, pour elle, la popularité était un signe de valeur, alors qu'il voyait le monde différemment.

Il avait parfois l'impression de se battre contre un mur lorsqu'il tentait de lui faire comprendre que l'importance des apparences ne devait pas primer sur les sentiments. À chaque fois qu'il s'exprimait, il la voyait lever les yeux au ciel, comme si son opinion n'avait aucune valeur.

Un jour, alors qu'ils étaient tous les deux en dehors du lycée, il avait osé lui avouer qu'il en avait marre de cette compétition constante entre les élèves. Elle l'avait regardé, les sourcils froncés. « Ce n'est pas comme ça que ça fonctionne, Ryu. C'est la vie, » avait-elle dit, un sourire condescendant sur les lèvres. Cette phrase lui était restée en travers de la gorge.

Il avait alors décidé de garder ses distances. La déléguée n'était pas une amie, mais plutôt un rappel constant de tout ce qu'il ne voulait pas devenir. Mieux valait se déconnecter de sa classe, car il se sentait comme un étranger dans ce monde superficiel où le jugement des autres pesait plus lourd que leur propre estime.

Ainsi, quand il avait appris que c'était elle qui le représenterait lors du conseil disciplinaire, il avait su, au fond de lui, qu'elle ne l'aiderait pas. Elle n'était pas là pour défendre la justice, mais pour s'assurer qu'elle restait en bons termes avec le professeur et le système. Cette pensée l'avait meurtri, et il avait compris qu'il devait se battre seul contre ce monde qui semblait vouloir l'écraser.

Ainsi commence la première journée de renvoi de Ryu. Le réveil sonne, et pour une fois, il ne se lève pas avec le poids du monde sur ses épaules. 6h. Comme tous les matins. Mais aujourd'hui, il brise son cycle de routine. Aujourd'hui, il n'a pas à se préparer pour aller au lycée.

Ses parents sont déjà partis au travail, laissant la maison plongée dans un silence pesant. Ryu se laisse tomber à nouveau sur son lit, la couette en désordre autour de lui. Il se sent… libre ? La liberté a un goût amer, comme un sucre qui se dissout lentement sur la langue. Il ferme les yeux et repense à la tournure du conseil disciplinaire.

Un soupir s'échappe de ses lèvres, accompagné d'un râlement de rage. « Je le savais qu'elle ne serait pas de mon côté », pense-t-il en se remémorant le visage de la déléguée, son sourire confiant et l'arrogance avec laquelle elle l'a rabroué. « M. Takashi a été le seul à défendre mon point de vue. »

La colère bouillonne en lui, mêlée à un sentiment d'injustice. Finalement, peu importe. Il se rend compte qu'il préfère être loin de tous ces hypocrites qui l'entourent au lycée. La désillusion s'installe en lui, comme une ombre qui refuse de le quitter. Pourquoi se battre pour être accepté dans un monde qui ne lui convient pas ?

Ryu tourne son regard vers l'ordinateur posé sur son bureau, une lueur d'espoir scintillant dans ses yeux. Les jours de renvoi sont peut-être l'occasion de s'évader un peu plus dans l'univers virtuel, là où il peut être qui il veut, sans jugements ni contraintes.

Il se redresse, décide de profiter de cette journée pour allumer son ordi, s'immerger dans un monde de pixels et de lumières, discuter avec des amis en ligne, se sentir un peu moins seul. C'est là qu'il se sent vraiment vivant, loin des chaînes invisibles du lycée et des regards désapprobateurs.

Alors qu'il se connecte, une pensée fugace lui traverse l'esprit : Peut-être que ce renvoi est une bénédiction déguisée. Un moment pour réfléchir à ses choix, pour se découvrir lui-même loin de la pression constante du monde scolaire.

Et avec un clic, il entre dans une nouvelle réalité, prêt à laisser derrière lui la colère et le ressentiment, au moins pour un temps. Il est seul, mais pour la première fois, il se sent un peu plus… lui-même.

Ryu passa sa première journée dans l'insouciance, ne comptant plus les heures passées sur ses jeux vidéo, oubliant même le dîner avec ses parents, trop occupé à répondre aux messages qu'il recevait sur internet. Il finit par se coucher tard.

Le lendemain, Ryu se lève et prépare son petit-déjeuner : une tartine de chocolat avec un bol de lait. Encore fatigué de sa nuit passée à jouer et discuter en ligne, des cernes sont bien visibles sous ses yeux, mais mentalement, il se sent plus libre que pendant les jours d'école.

Après avoir bien mangé, il va se laver, s'habille en jean au lieu de son habituel jogging, et choisit une belle veste. Il se coiffe brièvement, sachant très bien qu'avec son casque de scooter, sa coiffure ne tiendra pas longtemps. Il prend ses clés, son portable, et ferme la maison.

Il décide de passer voir ses parents, qui travaillent à moins de 10 minutes en scooter de la maison, et propose même de les aider un peu. Après tout, ils l'ont soutenu pendant le conseil, et c'est sa manière à lui de les remercier.

Un peu plus tard, il décide de faire une simple balade, sans avoir de destination précise en tête. Cette sensation de liberté, de pouvoir aller où bon lui semble, lui donne envie de revoir des amis qu'il n'a pas revus depuis un moment. Il appelle alors Léo, un ami qu'il connaît depuis ses 14 ans, avec qui il discutait beaucoup sur internet avant de le rencontrer lors de soirées communes.

Léo est drôle, populaire auprès des filles, avec ses cheveux courts toujours bien coiffés et son look impeccable. Il a l'air prêt à séduire n'importe qui. Ils décident de passer la journée ensemble à jouer au billard, à parler des filles et des amis qui, eux, sont encore en cours pendant qu'eux profitent de la journée.

Ils passent même un bon moment à flâner dans un petit parc près de la gare, où ils passent une bonne partie de leur temps à rêvasser et rire.

Mais tout a une fin. Léo doit reprendre le train pour rentrer chez lui, et cela sonne comme la fin de la récréation pour Ryu. Il reprend son scooter et rentre à la maison. Cette journée, il en gardera d'excellents souvenirs, et plus tard, elle l'aidera à se conforter dans les choix qu'il aura à faire.

Ainsi s'achève la deuxième journée de renvoi pour Ryu.

Ainsi commence le troisième jour de renvoi de Ryu. Il se réveille plus tard que d'habitude, sans l'obligation d'entendre son réveil sonner. Il est déjà 10 heures, et il se sent pleinement reposé, au point d'avoir négligé son rituel matinal. Il reste en pyjama, mais se rafraîchit rapidement le visage. Profitant de cette matinée, il range sa chambre, puis met la table pour le repas. Lorsqu'il s'assoit avec ses parents, un simple repas suffit à lui redonner le sourire. Il évoque brièvement sa journée passée avec Léo, sans trop entrer dans les détails.

Cependant, la légèreté du moment ne dure pas. Inévitablement, le sujet du lycée doit être abordé, un thème qu'il redoutait mais qu'il ne pouvait esquiver éternellement.

Sa mère prend la parole :
« Ryu, c'est ton dernier jour de renvoi aujourd'hui. Il est temps que tu prépares tes affaires et que tu réfléchisses à comment présenter tes excuses. C'est pour ça qu'ils t'ont suspendu, après tout. »

Un silence lourd s'installe. Ryu soupire, puis passe une main fatiguée sur son visage avant de répondre :
« Mais maman, tu sais bien que je n'ai rien fait de mal. J'ai juste fait remarquer qu'il allait trop loin en rabaissant mon camarade. Je n'ai ni été vulgaire ni agressif. »

Sa mère, d'un ton plus posé, lui rétorque :
« Je le sais bien, Ryu. Je me doute que tu n'as pas mal agi. Peut-être que tu n'as pas été irrespectueux, ni emporté, mais… ne penses-tu pas qu'en t'excusant, tu pourrais tourner la page et reprendre ton année sans encombre ? Parfois, il faut ravaler sa fierté, même si ça ne nous plaît pas. »

Ryu entend les mots de sa mère, mais il ne parvient pas à accepter cette idée.
« Oui… maman, » répond-il, résigné.

Il se lève ensuite pour préparer ses affaires de classe, s'assurant de ne rien oublier. Pendant qu'il s'y attelle, il ressasse dans sa tête tout ce qui l'attend à son retour. Est-ce que s'excuser reviendrait à admettre qu'il avait tort ? Est-ce qu'il n'aurait jamais dû intervenir comme il l'a fait ?

Ces pensées se multiplient et viennent peser lourdement sur sa poitrine, un malaise qu'il connaît bien. Pour échapper à cette spirale d'interrogations, il rallume son ordinateur. Cherchant un peu de réconfort, il se plonge dans son animé préféré, enchaînant les épisodes sans se soucier du temps. Puis il discute avec quelques amis en ligne à propos de son renvoi, espérant trouver des réponses. Certains lui disent qu'il aurait mieux fait de ne pas se mêler de l'affaire, d'autres, comme Léo, l'encouragent à suivre son instinct : « Si tu estimes que c'est injuste, il faut le dire. »

Face à ces avis divergents, Ryu reste perplexe. Il ne sait plus vraiment qui a raison. Plus l'heure de son retour au lycée approche, plus il se perd dans ses réflexions. A-t-il bien fait ? Agirait-il de la même façon si c'était à refaire ?

Finalement, à force de se questionner, il finit par sombrer dans le sommeil. Ainsi se termine son troisième jour de renvoi.`
    },
    chapter3: {
      title: "Chapitre 3",
      text: `C'est le jour J, le moment où Ryu doit retourner dans ce qui est pour lui une prison. Il n'a pas oublié de mettre son réveil, mais il se réveille péniblement, essayant d'exécuter son rituel qui a quelque peu changé avec ces trois jours de repos forcé.

Il n'a pas vraiment mal dormi, mais pas bien non plus ; beaucoup d'idées lui ont traversé l'esprit durant la nuit, ainsi que de nombreuses questions sans réponses. Il trouve des vêtements préparés par sa mère dans la salle de bain avant qu'elle ne parte au travail : un jean bleu un peu froissé, un T-shirt marron clair sur lequel figure une tête de lion noir en son milieu, et une belle veste blanche. Le temps s'étant un peu rafraîchi, il décide de sortir sa doudoune noire fétiche, qu'il garde précieusement depuis plusieurs années.

Il se demande si son T-shirt n'est pas tout simplement un message... puis se secoue la tête en se disant qu'il n'a pas le temps de penser à cela. Il enfile son sac à dos, ferme la maison et part pour le lycée.

Arrivé presque au portail, il croise Adeline, qui lui fait un petit coucou et laisse apparaître un sourire. Ryu, timide, lui renvoie le salut, se demandant si c'était bien à lui qu'il était destiné. Il entre par le portail et croise le regard des élèves qui le fusillent tout en chuchotant entre eux. Il préfère les ignorer, monte les escaliers et se dirige vers sa classe.

Il s'assoit, comme à son habitude, au fond de la salle, près de la fenêtre. Après tout, c'est le meilleur endroit pour se sentir comme un oiseau en cage qui contemple l'horizon. Certains élèves lui disent bonjour, tandis que d'autres préfèrent chuchoter, le regard rivé sur lui, en avançant dans la classe.

Adeline arrive dans la classe, elle lui sourit et se dirige vers sa place, qui est tout devant, près du professeur. Elle est une élève très studieuse et sérieuse, le contraire de Ryu.

Aujourd'hui, la journée commence par du français. Ce n'est pas encore le moment de se demander s'il doit présenter ses excuses à M. Lefèvre, car c'est Mme Bross pour le moment. Elle entre dans la classe, fait l'appel et constate que Ryu est présent.

Durant l'appel, elle remarque qu'une élève est absente. Elle jette un coup d'œil rapide dans la salle et voit une place libre à côté d'Adeline, due à l'absence de sa camarade. Elle demande alors à Ryu de prendre place ici afin de rattraper son retard et de recopier les cours d'Adeline, afin de ne pas retarder la classe et de se mettre à jour.

Un peu surpris, il se lève et s'installe comme prévu à côté d'elle, s'excusant et la remerciant de l'aider

Une légère gêne s’installe pour Ryu. Habituellement seul en classe, il se retrouve à présent coincé avec une camarade qu'il connaît à peine. Ils n'ont eu que très peu d'échanges depuis le début de l'année. Lui, si méfiant, commence à se demander si elle ne joue pas un rôle avec lui. Après tout, personne ne l’a défendu lors du conseil, personne n'a pris la parole pour le soutenir, et encore moins pour lui dire qu'il avait eu raison de réagir ainsi.

Ou alors… rien de tout ça ? Peut-être qu'au contraire, elle l’apprécie pour son geste ?

Adeline lui donne un léger coup de coude, puis lui tend les feuilles à recopier en chuchotant :
« Tiens, voilà les notes du cours. J'espère que tu arriveras à les lire. Tu peux les garder si tu n’as pas le temps de les recopier maintenant, tu me les rendras plus tard. »

Elle lui adresse un petit sourire avant de se reconcentrer sur la voix de la professeure.

Ryu la regarde, laissant apparaître un léger rougissement, et la remercie discrètement. Il s’efforce de recopier les notes rapidement pour ne pas la faire attendre.

Jetant un coup d'œil derrière lui, il observe la classe sous un nouvel angle. Certains élèves sont plongés dans le cours, d'autres chuchotent et rient doucement ensemble. Son regard finit par se poser sur la déléguée, et il voit clairement que des messes basses lui sont destinées, accompagnées de petits rires moqueurs qui commencent à l’agacer.

Le goût amer de sa trahison ne lui passe toujours pas. Ryu fulmine intérieurement, mais se retourne et se force à se concentrer sur les notes, déterminé à rattraper son retard. Après tout, il serait dommage de se faire remarquer dès son premier jour de retour.

Ryu finissait de recopier les notes qu’Adeline lui avait prêtées. Le cours de français venait de se terminer, et la classe s'agitait doucement. Des chuchotements s'élevaient ici et là, les élèves se détendaient avant l'arrivée du prochain professeur.

C’est alors que la déléguée, assise quelques rangées plus loin, se tourna légèrement vers lui, un sourire narquois sur le visage. Son ton, aussi condescendant que possible, n’allait pas passer inaperçu.
« Alors, ça fait quoi de revenir après un petit renvoi forcé ? » dit-elle d’un ton neutre mais clairement sarcastique.

Ryu leva un sourcil, puis un sourire froid se dessina sur ses lèvres. Il n’avait pas l’intention de se laisser faire. « Apparemment je t’ai manqué pendant ces trois jours. T’as toujours rien d’autre à faire ? » lança-t-il, un brin sarcastique, sans pour autant lever la voix.

La déléguée perdit légèrement son sourire, surprise par la réplique. Pendant un instant, elle sembla chercher une réponse, mais ne trouva rien de percutant à dire. Elle haussa simplement les épaules, le regard un peu fuyant, avant de retourner à sa place sans insister davantage.

Ryu suivit son mouvement du coin de l’œil. Il ne savait pas si elle était vexée ou simplement déstabilisée, mais peu importe. Pour lui, cette petite confrontation n’avait fait que confirmer ce qu’il pensait déjà : elle n’avait aucun intérêt à ses yeux. Elle restait un pion insignifiant dans ce jeu social qu’il méprisait. Pourtant, même en la remettant à sa place, il n’en tirait aucune satisfaction.

La classe était redevenue bruyante, les chuchotements fusaient autour de lui, et plusieurs regards lui étaient encore lancés. Ryu serra les dents, détournant son attention vers ses notes. Il savait que l’épreuve la plus difficile l’attendait encore : M. Lefèvre, le professeur d’éducation civique, ne tarderait pas à entrer. Le malaise s’intensifiait, et cette fois, il n’y aurait pas d’esquive possible.

Lorsque M. Lefèvre entra dans la classe, il se savait en position de force. Avec le retour de Ryu, il anticipait de pouvoir jouer son rôle de professeur irréprochable. Il posa son sac sur la table, s'installa et demanda aux élèves de retrouver leur calme et de s'asseoir.

Mais soudain, l’alarme incendie se déclencha. Ce jour-là, une vérification de tous les systèmes de sécurité avait été planifiée, et les élèves devaient rapidement se lever et se ranger par deux pour descendre dans la cour. Ils ne prirent que leurs manteaux, le temps ayant légèrement fraîchi.

Les quatre classes du lycée se retrouvèrent dans la cour, créant un brouhaha assourdissant, une cacophonie comme il n'y en avait jamais eu auparavant. Mais ce tumulte ne dura pas longtemps, car le principal fit son apparition. Il demanda à tous de faire silence pour procéder à l’appel et s’assurer que chacun était bien présent.

L'appel des élèves commença, et lorsque vint le tour de Ryu, il leva simplement le bras. Le directeur, d'un ton moqueur, ajouta : « Un bon retour, l’air frais te va bien ! » avant de poursuivre avec la liste.

Une fois l’appel terminé, il demanda à tout le monde de remonter calmement dans leurs classes respectives, accompagnés de leurs professeurs. Ryu se fichait pas mal de l’avis du principal, feignant de ne pas avoir entendu sa remarque. Ce n’était toujours pas le moment de se montrer, même si tout en lui le poussait à sortir de ses gonds.

Il avait néanmoins gagné vingt-cinq minutes sur l'heure de cours avec M. Lefèvre.

Le cours d’éducation civique reprit, et une ambiance étrange flottait dans l’air. M. Lefèvre, fidèle à lui-même, arborait un air satisfait en scrutant la classe. Ses yeux se posaient de temps à autre sur Ryu, comme s'il attendait une réaction particulière de sa part.

« Alors, mes chers élèves, qu'est-ce qui définit un bon élève ? Est-ce simplement celui qui se conforme aux règles ? » commença-t-il, en laissant un silence pesant s'installer. « J’ai récemment eu l’occasion de discuter avec certains d'entre vous, et il semblerait que quelques-uns aient besoin de réviser ce point. » Il jeta un regard appuyé vers Ryu. « Je parle, bien sûr, de ceux qui ont eu besoin d'une petite pause récemment. »

La colère commença à monter en Ryu. Une pause ? Est-ce que c’est comme ça qu’il appelle ça ? Un renvoi, plutôt ! Je suis ici pour apprendre, pas pour écouter ses leçons de morale !

M. Lefèvre poursuivit, un sourire en coin. « L’éducation est un privilège, mes chers élèves. Certains d’entre vous, je le sais, ne semblent pas apprécier cette chance. Mais peut-être que cela ne s'applique pas à tous. » Son regard se posa à nouveau sur Ryu. « On pourrait dire que certains ont encore des leçons à tirer de cette expérience. »

Privilège ? Qu’est-ce qu’il en sait ? Il n’a aucune idée de ce que je ressens. Il se croit supérieur, comme s'il pouvait juger qui que ce soit ici !

Il continua, un ton légèrement condescendant : « N'oubliez pas, la loi est là pour nous guider. Ce n’est pas juste un ensemble de règles à suivre, mais un cadre moral. Ryu, as-tu quelque chose à ajouter à ce sujet, ou préfères-tu garder le silence, comme lors de ta dernière leçon ? »

Silence ? Je ne suis pas en train de me cacher, c’est lui qui ne comprend rien. Chaque fois qu’il ouvre la bouche, je me demande ce qu’il a dans la tête. Peut-être qu’un jour, il comprendra que tout le monde ne doit pas se plier à sa vision du monde !

M. Lefèvre continuait à parler, mais Ryu ne pouvait plus se concentrer. Les mots résonnaient dans sa tête comme une mélodie désagréable. La colère bouillonnait en lui, alimentée par chaque allusion, chaque regard de travers de ses camarades. Il se promettait qu’il n’allait pas laisser cela passer, mais pour l’instant, il se contentait d’accuser le coup, attendant le moment propice pour faire entendre sa voix.

Alors que M. Lefèvre continuait à déverser ses insinuations, Ryu sentait la colère monter en lui, comme un volcan prêt à entrer en éruption. C'était à la fois frustrant et épuisant d'entendre ces piques dissimulées sous le vernis d'un discours pédagogique.

Tout en essayant de garder son calme, il aperçut Adeline assise à ses côtés. Elle lui chuchota d’un ton rassurant : « Psst, t’en fais pas, ignore-le et continue de copier les cours. »

Sa voix douce et réconfortante apporta une légère brise de calme dans la tempête qui faisait rage en lui. Ryu lui lança un regard reconnaissant, mais il savait qu'il ne pourrait pas simplement ignorer les remarques du professeur. Pourquoi déverse-t-il sa colère sur moi ? Après tout, je n'ai rien fait pour mériter ce traitement. On parle souvent des jeunes qui n'écoutent pas en classe ou qui se rebellent face aux professeurs. Certains en viennent même aux mains et aux insultes, mais ce n'est pas mon cas, alors pourquoi cet acharnement ? N'est-il pas censé m'apprendre et me préparer pour le monde du travail ?

Pfff, pour le moment, je dois me concentrer à recopier tout ce retard.

Ryu cessa de recopier les notes et se mit à rêvasser, comme à son habitude, tout en ignorant les piques de M. Lefèvre. Il laissa son regard errer sur sa trousse, puis sur son sac, et enfin sur le mur, laissant vaguer son imagination.

Soudain, il fut rattrapé par Adeline qui, amusée, lui chuchota : « Attention, ça risque de vexer le prof si tu continues ! »

Ryu se demanda si elle était vraiment de son côté ou si elle jouait avec la situation. Il ne savait toujours pas comment la situer dans son esprit. Préférant ne pas répondre, il tourna la tête, tout en ressentant au fond de lui une légère amusement face à sa remarque.

Ryu se tourna vers l’élève qu’il avait défendu, par simple curiosité. Celui-ci, tout rouge, semblait un peu moins stressé que d’habitude, sans doute apaisé par le changement de cible du professeur. Ryu l’observa, conscient de la manière dont le prof jouait avec les émotions de chacun.

Cet élève était plutôt corpulent, avec des cheveux courts et des taches de rousseur sur les joues. Souvent seul dans le lycée, il était assis derrière la déléguée. Bien qu’il fût parfois le souffre-douleur, il ne laissait rien transparaître. Ryu remarqua qu'ils étaient totalement différents physiquement, mais qu'ils partageaient certaines similitudes.

Il ne put s’empêcher d’éprouver une certaine admiration pour la force de caractère de cet élève face à toutes ces moqueries. Pourquoi continue-t-il à encaisser sans broncher ? se demanda Ryu. C'était le genre de force que beaucoup de gens n'avaient pas, et même si cet élève n’était pas un ami, il le respectait pour ça.

Leurs regards se croisèrent brièvement. L'un baissa rapidement la tête, tandis que l'autre feignait de ne pas le voir. En se retournant, Ryu croisa également le regard de la déléguée, qui semblait toujours vexée par sa réponse. Elle avait l'air de bouder.

Il se sentit embarrassé, mais aussi fier de lui. Après tout, elle pouvait bouder autant qu'elle le voulait, cela ne valait pas l'humiliation qu'il avait endurée. Une douce chaleur l'envahit brièvement, mais ce plaisir fut de courte durée. La fin du cours approchait, et il savait qu'il devait prendre une décision. Une décision qui pourrait tout changer… ou tout empirer.

Au fond de lui, il commençait à dresser une liste mentale des pour et des contre. S’il décidait de s'excuser, rien ne garantissait que cela mettrait fin à son calvaire. Au contraire, il pourrait devenir le souffre-douleur permanent, celui qu'on pointerait du doigt, un exemple de rébellion écrasée. Et puis, il devrait redoubler d’efforts pour ne pas être jugé injustement par M. Lefèvre. Fini de rêvasser au fond de la classe, de regarder par la fenêtre cette vie qui filait loin de lui. Fini d’admirer les corbeaux croassant dans la cour.

Mais s’il refusait… il continuerait à s’attirer l’hostilité de certains camarades. Mais était-ce si grave ? Au moins, il resterait fidèle à ses principes. Il n’avait fait que dénoncer un professeur injuste.

Cependant, une autre menace planait, celle du principal. Et Ryu savait que ce refus entraînerait probablement d’autres événements. Serait-il capable de tenir tête à cette nouvelle pression ?

Il continua de ruminer, la cloche sonna, le tirant brusquement de ses pensées. Et soudain, une autre idée lui traversa l'esprit :
« Et si... Et si je ne disais rien ? Si je faisais comme si rien ne s'était passé ? Ou alors, si je devais vraiment répondre, pourquoi ne pas rester vague... sans être clair... »`
    }
  };

  const characters = [
    {
      name: 'Adeline',
      image: adelineImage,
      description: 'Une jeune fille mystérieuse et intelligente.'
    },
    {
      name: 'Ryu',
      image: ryuImage,
      description: 'Un adolescent désabusé et solitaire.'
    }
  ];

  const renderCharacterPage = (character) => {
    return (
      <div className="character-page">
        <div className="character-image-container">
          <img 
            src={character.image} 
            alt={character.name}
            className="character-image"
          />
        </div>
        <div className="character-description">
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (bookState) {
      case 'cover':
        return (
          <div className="book-cover-container">
            <div className="book-cover" onClick={() => handleStateChange('forward')}>
              <div className="cover-image" style={{ backgroundImage: `url(${coverImage})` }}></div>
              <div className="cover-content">
                <h1>Le Dernier Vol du Corbeau</h1>
                <p>Un roman de Maxime Canda</p>
              </div>
            </div>
            <button className="view-back-cover" onClick={() => handleStateChange('backcover')}>
              Voir le résumé
            </button>
          </div>
        );

      case 'characters':
        return (
          <>
            <button className="back-button" onClick={() => handleStateChange('back')}>
              ← Retour
            </button>
            <div className="book-pages">
              <div className="book-page left-page">
                <div className="page-content">
                  <h2 className="page-title">Les Personnages</h2>
                  {renderCharacterPage(characters[0])}
                </div>
              </div>
              <div className="book-page right-page">
                <div className="page-content">
                  {renderCharacterPage(characters[1])}
                </div>
              </div>
            </div>
            <button className="start-story-button" onClick={() => handleStateChange('forward')}>
              Commencer l'histoire
            </button>
          </>
        );

      case 'backcover':
        return (
          <div className="book-back-container">
            <div className="book-back">
              <div className="back-image" style={{ backgroundImage: `url(${backImage})` }}></div>
              <div className="back-content">
                <h2>Synopsis</h2>
                <div className="synopsis">
                  {synopsis.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <button className="return-button" onClick={() => handleStateChange('back')}>
                  Retourner à la couverture
                </button>
              </div>
            </div>
          </div>
        );

      case 'story':
        const { pages, prologueLength, chapter1Length, chapter2Length } = cachedPages ? cachedPages : getAllPages();
        const leftPageIndex = currentPage;
        const rightPageIndex = currentPage + 1;
        
        const isLeftPagePrologue = leftPageIndex < prologueLength;
        const isRightPagePrologue = rightPageIndex < prologueLength;
        const isLeftPageChapter1 = leftPageIndex >= prologueLength && leftPageIndex < chapter1Length;
        const isRightPageChapter1 = rightPageIndex >= prologueLength && rightPageIndex < chapter1Length;
        const isLeftPageChapter2 = leftPageIndex >= chapter1Length && leftPageIndex < chapter2Length;
        const isRightPageChapter2 = rightPageIndex >= chapter1Length && rightPageIndex < chapter2Length;
        const isLeftPageChapter3 = leftPageIndex >= chapter2Length;
        const isRightPageChapter3 = rightPageIndex >= chapter2Length;

        // Détermine si nous devons afficher les titres
        const showPrologueTitle = leftPageIndex === 0;
        const showChapter1Title = leftPageIndex === prologueLength;
        const showChapter2Title = leftPageIndex === chapter1Length;
        const showChapter3Title = leftPageIndex === chapter2Length;

        return (
          <div className="book-pages">
            <div className={`book-page left-page ${isPageTurning && turningDirection === 'prev' ? 'turning' : ''}`}>
              <div className="page-content">
                {showPrologueTitle && (
                  <h2 className="page-title">{bookContent.prologue.title}</h2>
                )}
                {showChapter1Title && (
                  <h2 className="page-title">{bookContent.chapter1.title}</h2>
                )}
                {showChapter2Title && (
                  <h2 className="page-title">{bookContent.chapter2.title}</h2>
                )}
                {showChapter3Title && (
                  <h2 className="page-title">{bookContent.chapter3.title}</h2>
                )}
                <div className="page-text">
                  {pages[leftPageIndex]}
                </div>
                <div className="page-number">{leftPageIndex + 1}</div>
              </div>
            </div>
            <div className={`book-page right-page ${isPageTurning && turningDirection === 'next' ? 'turning' : ''}`}>
              {rightPageIndex < pages.length && (
                <div className="page-content">
                  <div className="page-text">
                    {pages[rightPageIndex]}
                  </div>
                  <div className="page-number">{rightPageIndex + 1}</div>
                </div>
              )}
            </div>
            <button 
              className="turn-button prev" 
              onClick={() => handlePageTurn('prev')}
              disabled={currentPage === 0}
            >
              ←
            </button>
            <button 
              className="turn-button next" 
              onClick={() => handlePageTurn('next')}
              disabled={rightPageIndex >= pages.length}
            >
              →
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="book-container">
      {renderContent()}
    </div>
  );
};

export default Book;
