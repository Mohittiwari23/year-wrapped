// js/cardNavigator.js
import { animateMetrics } from "./metricCounter.js";
import { enhanceCardAnimations } from './animationEnhancer.js';

let cards = [];
let activeIndex = 0;
let isLocked = false;

let rail;
let viewport;

/* =========================
   INIT
   ========================= */

export function initCardNavigator() {
  rail = document.getElementById("cardRail");
  viewport = document.querySelector(".wrapped-viewport");
  cards = Array.from(document.querySelectorAll(".card"));

  if (!rail || !viewport || !cards.length) {
    console.warn("Navigator init failed");
    return;
  }

  // 🔧 FIX: Initialize first card as active
  activeIndex = 0;
  update();
  bindWheel();
  bindDrag();
}

/* =========================
   CORE UPDATE
   ========================= */

function update() {
  cards.forEach((card, i) => {
    card.classList.remove(
      "card--active",
      "card--prev",
      "card--next",
      "card--hidden"
    );

    if (i === activeIndex) {
      card.classList.add("card--active");
      animateMetrics(card);
      enhanceCardAnimations(card);
    } else if (i === activeIndex - 1) {
      card.classList.add("card--prev");
    } else if (i === activeIndex + 1) {
      card.classList.add("card--next");
    } else {
      card.classList.add("card--hidden");
    }
  });

  // Small delay to let CSS transitions apply before calculating position
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      centerActiveCard();
    });
  });
}


/* =========================
   CAMERA (FIXED FOR DYNAMIC WIDTHS)
   ========================= */

function centerActiveCard() {
  const activeCard = cards[activeIndex];
  if (!activeCard || !viewport) return;

  const viewportWidth = viewport.offsetWidth;
  const viewportCenter = viewportWidth / 2;
  
  // Get the rail's current position
  const railRect = rail.getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();
  
  // Get active card's ACTUAL position (after CSS has applied width/aspect-ratio changes)
  const cardRect = activeCard.getBoundingClientRect();
  
  // Calculate where the card's center currently is relative to viewport
  const cardCenterInViewport = cardRect.left - viewportRect.left + (cardRect.width / 2);
  
  // Calculate how much we need to shift to center it
  const offsetNeeded = viewportCenter - cardCenterInViewport;
  
  // Get current transform value
  const currentTransform = rail.style.transform;
  const currentX = currentTransform 
    ? parseFloat(currentTransform.match(/translateX\(([-\d.]+)px\)/)?.[1] || 0)
    : 0;
  
  // Apply the correction
  const newX = currentX + offsetNeeded;
  
  rail.style.transform = `translateX(${newX}px)`;
  
  // ✅ UPDATE SCROLL PROGRESS FOR COSMOS EFFECTS
  updateScrollProgress();
}

function updateScrollProgress() {
  // Calculate progress (0 to 1) based on active card index
  const progress = cards.length > 1 ? activeIndex / (cards.length - 1) : 0;
  document.body.style.setProperty('--scroll-progress', progress.toFixed(4));
}

/* =========================
   NAVIGATION
   ========================= */

function next() {
  if (isLocked || activeIndex >= cards.length - 1) return;
  activeIndex++;
  lock();
  update();
}

function prev() {
  if (isLocked || activeIndex <= 0) return;
  activeIndex--;
  lock();
  update();
}

/* =========================
   INPUT
   ========================= */

function bindWheel() {
  let acc = 0;

  window.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

      acc += e.deltaX;

      if (acc > 80) {
        next();
        acc = 0;
      } else if (acc < -80) {
        prev();
        acc = 0;
      }
    },
    { passive: true }
  );
}

function bindDrag() {
  let startX = null;

  window.addEventListener("mousedown", (e) => {
    startX = e.clientX;
  });

  window.addEventListener("mouseup", (e) => {
    if (startX === null) return;

    const dx = e.clientX - startX;
    if (dx < -60) next();
    if (dx > 60) prev();

    startX = null;
  });
}

/* =========================
   LOCK
   ========================= */

function lock() {
  isLocked = true;
  setTimeout(() => (isLocked = false), 700);
}