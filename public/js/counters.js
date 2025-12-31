// counters.js

export function animateCount(element) {
  const raw = element.textContent.replace(/,/g, '');
  const target = parseInt(raw, 10);

  if (isNaN(target)) return;

  const duration = Math.min(1200, 400 + target / 100);
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(progress * target);
    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}
