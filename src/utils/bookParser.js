/**
 * Calcule approximativement la taille du texte en caractères
 * @param {string} text - Le texte à mesurer
 * @returns {number} - Nombre approximatif de caractères
 */
const approximateTextLength = (text) => {
  return text.length;
};

/**
 * Divise un long texte en paragraphes plus courts
 * @param {string} text - Le texte à diviser
 * @param {number} maxLength - Longueur maximale par paragraphe
 * @returns {string[]} - Tableau de paragraphes
 */
const splitLongText = (text, maxLength = 800) => {
  if (approximateTextLength(text) <= maxLength) {
    return [text];
  }

  const sentences = text.split('. ');
  const paragraphs = [];
  let currentParagraph = '';

  sentences.forEach((sentence) => {
    const potentialParagraph = currentParagraph + sentence + '. ';
    if (approximateTextLength(potentialParagraph) > maxLength) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
      }
      currentParagraph = sentence + '. ';
    } else {
      currentParagraph = potentialParagraph;
    }
  });

  if (currentParagraph) {
    paragraphs.push(currentParagraph.trim());
  }

  return paragraphs;
};

/**
 * Convertit le contenu Markdown en structure de pages pour l'affichage
 * @param {string} markdownContent - Le contenu Markdown brut
 * @returns {Array} Un tableau de pages formatées
 */
export function parseBookContent(markdownContent) {
  const lines = markdownContent.split('\n');
  const pages = [];
  let currentPage = [];
  let currentSection = '';
  let isInPrologue = false;
  let pageCount = 0;
  
  const addPage = () => {
    if (currentPage.length > 0) {
      pages.push([...currentPage]);
      pageCount++;
      currentPage = [];
    }
  };
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // Gestion du titre principal
    if (trimmedLine.startsWith('# ')) {
      currentPage.push({
        type: 'title',
        content: trimmedLine.replace('# ', '').trim()
      });
      addPage();
      return;
    }
    
    // Gestion du prologue et autres sous-titres
    if (trimmedLine.startsWith('## ')) {
      addPage();
      
      currentPage.push({
        type: 'subtitle',
        content: trimmedLine.replace('## ', '').trim()
      });
      
      if (trimmedLine.includes('Prologue')) {
        isInPrologue = true;
      } else {
        isInPrologue = false;
      }
      return;
    }
    
    // Gestion du texte
    if (trimmedLine !== '') {
      currentSection += (currentSection ? ' ' : '') + trimmedLine;
    } else if (currentSection) {
      // Si nous sommes dans le prologue, on garde tout sur la même page
      if (isInPrologue) {
        currentPage.push({
          type: 'text',
          content: currentSection
        });
      } else {
        // Diviser le texte en paragraphes plus courts
        const paragraphs = splitLongText(currentSection);
        paragraphs.forEach(paragraph => {
          if (currentPage.length >= 2) {
            addPage();
          }
          currentPage.push({
            type: 'text',
            content: paragraph
          });
        });
      }
      currentSection = '';
    }
  });
  
  // Ajouter la dernière page si nécessaire
  if (currentSection) {
    currentPage.push({
      type: 'text',
      content: currentSection
    });
  }
  addPage();
  
  // Ajouter une page vide après la page 37
  if (pages.length >= 37) {
    pages.splice(37, 0, [{
      type: 'empty',
      content: ''
    }]);
  }
  
  return pages;
}
