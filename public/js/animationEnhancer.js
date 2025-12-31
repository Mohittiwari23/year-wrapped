// js/animationEnhancer.js
// Enhances card-specific animations when they become active

/**
 * Called when a card becomes active
 * Handles special animation setups for specific card types
 */
export function enhanceCardAnimations(card) {
  if (!card) return;

  // For comparison bar animations: store and reset widths
  if (card.classList.contains('card--style-whisper-pour')) {
    const bars = card.querySelectorAll('.comparison-bar');
    bars.forEach((bar) => {
      const targetWidth = bar.style.width;
      if (targetWidth && targetWidth !== '0%') {
        // Store the target width as a CSS variable
        bar.style.setProperty('--target-width', targetWidth);
        // Temporarily reset to 0 so animation can fill it
        setTimeout(() => {
          bar.style.width = '0';
          // Let CSS animation take over
          requestAnimationFrame(() => {
            bar.style.width = targetWidth;
          });
        }, 10);
      }
    });
  }

  // For typing effect cards: ensure overflow is visible
  if (card.classList.contains('card--style-whisper-type')) {
    const interpretation = card.querySelector('.card-interpretation');
    if (interpretation) {
      interpretation.style.overflow = 'hidden';
    }
  }

  // For burst effects: trigger reflow to restart animations
  if (card.classList.contains('card--style-burst') || 
      card.classList.contains('card--style-burst-heart')) {
    // Force reflow
    void card.offsetWidth;
  }
}