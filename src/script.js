document.addEventListener('DOMContentLoaded', function() {
    // Ne s'exécute que sur la page "decaled"
    if (!document.body.classList.contains('decaled')) return;

    const MIN_HEIGHT = 540;
    const DECALAGE_HEIGHT = 580;
    const REDUCTION_AMOUNT = 40;
    const DESKTOP_BREAKPOINT = 1316;

    function resetCardStyles() {
      const allCards = document.querySelectorAll('.card, .card-double');
      allCards.forEach(card => {
        card.style.minHeight = '';
        card.style.height = '';
        card.style.transform = '';
      });
    }

    function getCardHeight(card) {
      // Sauvegarder la transformation actuelle
      const originalTransform = card.style.transform;
      
      // Supprimer temporairement la transformation pour mesurer la vraie hauteur
      card.style.transform = 'none';
      const height = card.offsetHeight;
      
      // Restaurer la transformation
      card.style.transform = originalTransform;
      
      return height;
    }

    function groupCardsByRow(cards) {
      const rows = [];
      let currentRow = [];
      let currentRowTop = null;

      cards.forEach(card => {
        const cardTop = card.offsetTop;

        if (currentRowTop === null || Math.abs(cardTop - currentRowTop) > 10) {
          if (currentRow.length > 0) {
            rows.push(currentRow);
          }
          currentRow = [card];
          currentRowTop = cardTop;
        } else {
          currentRow.push(card);
        }
      });

      if (currentRow.length > 0) {
        rows.push(currentRow);
      }

      return rows;
    }

    function calculateRowHeight(row) {
      let maxHeight = 0;
      row.forEach(card => {
        const height = getCardHeight(card);
        maxHeight = Math.max(maxHeight, height);
      });

      let finalHeight = Math.max(MIN_HEIGHT, maxHeight);

      // Si la hauteur maximale est exactement 580px, la ramener à 540px
      if (maxHeight === DECALAGE_HEIGHT) {
        finalHeight = MIN_HEIGHT;
      }

      return finalHeight;
    }

    function alignCardHeights() {
      // Ne s'exécute que sur les écrans plus larges que desktop
      if (window.innerWidth <= DESKTOP_BREAKPOINT) return;

      const container = document.querySelector('.cards-container');
      if (!container) return;

      resetCardStyles();
      requestAnimationFrame(() => {
        // Réappliquer les transformations pour les cartes décalées
        const decaledCards = document.querySelectorAll('.card-decaled');
        decaledCards.forEach(card => {
          card.style.transform = 'translateY(40px)';
        });

        const allCards = container.querySelectorAll('.card, .card-double');
        const rows = groupCardsByRow(allCards);

        rows.forEach(row => {
          const finalHeight = calculateRowHeight(row);
          row.forEach(card => {
            card.style.minHeight = finalHeight + 'px';
            card.style.height = finalHeight + 'px';
          });
        });
      });
    }

    setTimeout(alignCardHeights, 100);

    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(alignCardHeights, 250);
    });
  });