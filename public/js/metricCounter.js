// js/metricCounter.js

const animatedMetrics = new WeakSet();

export function animateMetrics(card) {
  if (!card) return;

  const metrics = card.querySelectorAll(".metric");

  metrics.forEach((el) => {
    if (animatedMetrics.has(el)) return;

    const finalValue = parseInt(el.textContent.replace(/,/g, ""), 10);
    if (isNaN(finalValue)) return;

    animatedMetrics.add(el);
    el.textContent = "0";

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(finalValue * progress);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = finalValue.toLocaleString();
      }
    }

    requestAnimationFrame(tick);
  });
}
