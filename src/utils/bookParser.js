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
  let isFirstPage = true;
  let isInPrologue = false;
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // Gestion du titre principal
    if (trimmedLine.startsWith('# ')) {
      currentPage.push({
        type: 'title',
        content: trimmedLine.replace('# ', '').trim()
      });
      pages.push([...currentPage]);
      currentPage = [];
      isFirstPage = false;
      return;
    }
    
    // Gestion du prologue et autres sous-titres
    if (trimmedLine.startsWith('## ')) {
      if (currentPage.length > 0) {
        pages.push([...currentPage]);
        currentPage = [];
      }
      
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
        // Pour les autres sections, on divise en pages selon la longueur
        const paragraphs = splitLongText(currentSection);
        paragraphs.forEach(paragraph => {
          if (currentPage.length >= 2 && !isInPrologue) {
            pages.push([...currentPage]);
            currentPage = [];
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

  // Traiter la dernière section si elle existe
  if (currentSection) {
    if (isInPrologue) {
      currentPage.push({
        type: 'text',
        content: currentSection
      });
    } else {
      const paragraphs = splitLongText(currentSection);
      paragraphs.forEach(paragraph => {
        if (currentPage.length >= 2 && !isInPrologue) {
          pages.push([...currentPage]);
          currentPage = [];
        }
        currentPage.push({
          type: 'text',
          content: paragraph
        });
      });
    }
  }

  // Ajouter la dernière page si elle n'est pas vide
  if (currentPage.length > 0) {
    pages.push([...currentPage]);
  }

  return pages;
}
