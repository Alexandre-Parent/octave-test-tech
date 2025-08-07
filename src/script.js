document.addEventListener("DOMContentLoaded", function () {
  if (!document.body.classList.contains("decaled")) return;

  const MIN_HEIGHT = 540;
  const DECALAGE_HEIGHT = 580;
  const DESKTOP_BREAKPOINT = 1316; 

  function resetCardStyles() {
    const allCards = document.querySelectorAll(".card, .card-double, .card-large");
    allCards.forEach((card) => {
      card.style.minHeight = "";
      card.style.height = "";
      card.style.transform = "";
    });
    console.log('Styles des cartes réinitialisés');
  }

  function getCardHeight(card) {
    const originalTransform = card.style.transform;

    card.style.transform = "none";
    const height = card.offsetHeight;

    card.style.transform = originalTransform;

    return height;
  }

  function groupCardsByRow(cards) {
    const rows = [];
    let currentRow = [];
    let currentRowTop = null;

    cards.forEach((card) => {
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
    row.forEach((card) => {
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
    console.log('alignCardHeights appelé, largeur:', window.innerWidth);
    if (window.innerWidth <= DESKTOP_BREAKPOINT) {
      console.log('Largeur trop petite, nettoyage des styles et abandon');
      resetCardStyles();
      return;
    }

    const container = document.querySelector(".cards-container");
    if (!container) return;

    resetCardStyles();
    requestAnimationFrame(() => {
      const decaledCards = document.querySelectorAll(".card-decaled");
      decaledCards.forEach((card) => {
        card.style.transform = "translateY(40px)";
      });

      const allCards = container.querySelectorAll(".card, .card-double");
      const rows = groupCardsByRow(allCards);

      rows.forEach((row) => {
        const finalHeight = calculateRowHeight(row);
        row.forEach((card) => {
          card.style.minHeight = finalHeight + "px";
          card.style.height = finalHeight + "px";
        });
      });
    });
  }

  setTimeout(alignCardHeights, 100);

  let resizeTimeout;
  window.addEventListener("resize", function () {
    console.log('Resize détecté, redimensionnement en cours...');
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('Exécution de alignCardHeights après resize');
      alignCardHeights();
    }, 250);
  });
});

///////////////////// Animation de fade SVG au scroll /////////////////////

const animateSvgFade = () => {
  const scrollY = window.scrollY;
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;
  
  const heroHeight = heroSection.offsetHeight;
  const scrollProgress = Math.min(scrollY / (heroHeight * 0.5), 1);

  const allSvgs = document.querySelectorAll("svg");
  const desktopSvg = Array.from(allSvgs).find(
    (svg) =>
      svg.classList.contains("hidden") && svg.classList.contains("md:block")
  );
  const mobileSvg = Array.from(allSvgs).find(
    (svg) =>
      svg.classList.contains("block") && svg.classList.contains("md:hidden")
  );

  let mobileSvgFinal = mobileSvg;
  if (!mobileSvg) {
    mobileSvgFinal = Array.from(allSvgs).find(
      (svg) => svg.classList.contains("md:hidden")
    );
  }

  const fadePosition = scrollProgress;

  const updateSvgMask = (svg) => {
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    
    let revealWidth;
    if (svg.classList.contains("md:hidden")) {
      const scaleFactor = svgWidth / 375;
      revealWidth = 375 * fadePosition * scaleFactor;
    } else {
      revealWidth = svgWidth * fadePosition;
    }

    let mask = svg.querySelector("mask");
    if (!mask) {
      mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
      mask.setAttribute(
        "id",
        `mask-${Math.random().toString(36).substr(2, 9)}`
      );
      svg.appendChild(mask);
    }

    let maskRect = mask.querySelector("rect");
    if (!maskRect) {
      maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      mask.appendChild(maskRect);
    }

    maskRect.setAttribute("x", "0");
    maskRect.setAttribute("y", "0");
    maskRect.setAttribute("width", revealWidth);
    maskRect.setAttribute("height", svgHeight);
    maskRect.setAttribute("fill", "white");

    svg.setAttribute("mask", `url(#${mask.id})`);
  };

  const updateSvgBorder = (svg) => {
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    
    let borderX;
    if (svg.classList.contains("md:hidden")) {
      const scaleFactor = svgWidth / 375;
      borderX = 375 * fadePosition * scaleFactor;
    } else {
      borderX = svgWidth * fadePosition;
    }
    
    const borderWidth = Math.max(5, Math.min(20, fadePosition * 40));



    let borderMask = svg.querySelector(".border-mask");
    if (!borderMask) {
      borderMask = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "mask"
      );
      borderMask.setAttribute("class", "border-mask");
      borderMask.setAttribute(
        "id",
        `border-mask-${Math.random().toString(36).substr(2, 9)}`
      );
      svg.appendChild(borderMask);
    }

    let borderMaskRect = borderMask.querySelector("rect");
    if (!borderMaskRect) {
      borderMaskRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      borderMask.appendChild(borderMaskRect);
    }

    borderMaskRect.setAttribute("x", borderX - borderWidth);
    borderMaskRect.setAttribute("y", "0");
    borderMaskRect.setAttribute("width", borderWidth);
    borderMaskRect.setAttribute("height", svgHeight);
    borderMaskRect.setAttribute("fill", "white");

    let borderPath = svg.querySelector(".border-path");
    if (!borderPath) {
      borderPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      borderPath.setAttribute("class", "border-path");
      const originalPath = svg.querySelector("path");
      if (originalPath) {
        borderPath.setAttribute("d", originalPath.getAttribute("d"));
        borderPath.setAttribute("stroke", "black");
        borderPath.setAttribute("stroke-width", "4");
        borderPath.setAttribute("stroke-linecap", "round");
        borderPath.setAttribute("fill", "none");
        borderPath.setAttribute("mask", `url(#${borderMask.id})`);
      }
      svg.appendChild(borderPath);
    }

    if (borderWidth > 5) {
      createSparkles(svg, borderX, svgHeight, borderWidth);
    } else {
      svg.querySelectorAll(".sparkle").forEach((s) => s.remove());
    }
  };

  const createSparkles = (svg, borderX, svgHeight, borderWidth) => {
    svg
      .querySelectorAll(".sparkle, .sparkle-line, .sparkle-star")
      .forEach((s) => s.remove());
    const sparkleCount = Math.floor(borderWidth / 1.5);

    for (let i = 0; i < sparkleCount; i++) {
      let sparkle;
      const sparkleType = Math.random();

      if (sparkleType < 0.4) {
        sparkle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        sparkle.setAttribute("class", "sparkle");
        sparkle.setAttribute("r", Math.random() * 4 + 1);
        sparkle.setAttribute("fill", getRandomSparkleColor());
      } else if (sparkleType < 0.7) {
        sparkle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        sparkle.setAttribute("class", "sparkle-line");
        const length = Math.random() * 8 + 4;
        sparkle.setAttribute("x1", 0);
        sparkle.setAttribute("y1", -length / 2);
        sparkle.setAttribute("x2", 0);
        sparkle.setAttribute("y2", length / 2);
        sparkle.setAttribute("stroke", getRandomSparkleColor());
        sparkle.setAttribute("stroke-width", Math.random() * 2 + 1);
        sparkle.setAttribute("stroke-linecap", "round");
      } else {
        sparkle = createStarSparkle();
        sparkle.setAttribute("class", "sparkle-star");
      }

      const { x, y, opacity } = getRandomPathPoint(
        svg,
        borderX,
        borderWidth
      );
      sparkle.setAttribute("cx", x);
      sparkle.setAttribute("cy", y);
      sparkle.setAttribute("opacity", opacity);

      const animationType = Math.random();
      if (animationType < 0.33) {
        sparkle.style.animation = "sparkle 1s infinite";
      } else if (animationType < 0.66) {
        sparkle.style.animation = "sparkle-pulse 1s infinite";
      } else {
        sparkle.style.animation = "sparkle-rotate 1s infinite";
      }

      svg.appendChild(sparkle);
    }
  };

  const getRandomPathPoint = (svg, borderX, borderWidth) => {
    const svgRect = svg.getBoundingClientRect();

    const x = borderX - borderWidth/2;

    const centerY = svgRect.height / 2;
    const spreadY = svgRect.height * 0.1;
    const y = centerY + (Math.random() - 0.5) * spreadY * 2;

    return { x, y };
  };

  const createStarSparkle = () => {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const points = 5;
    const outerRadius = Math.random() * 3 + 2;
    const innerRadius = outerRadius * 0.4;
    let pathData = "";

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      pathData += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }

    pathData += " Z";
    star.setAttribute("d", pathData);
    star.setAttribute("fill", getRandomSparkleColor());
    return star;
  };

  const getRandomSparkleColor = () => {
    const colors = [
      "#FFD700",
      "#FFA500",
      "#FF4500",
      "#FFFF00",
      "#FF6B35",
      "#FF8C00",
      "#FF6347",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  updateSvgMask(desktopSvg);
  updateSvgMask(mobileSvgFinal);
  updateSvgBorder(desktopSvg);
  updateSvgBorder(mobileSvgFinal);
};

window.addEventListener("scroll", () => requestAnimationFrame(animateSvgFade));
document.addEventListener("DOMContentLoaded", () => animateSvgFade());


window.addEventListener("scroll", () => {
  requestAnimationFrame(animateSvgFade);
});

document.addEventListener("DOMContentLoaded", () => {
  animateSvgFade();
});