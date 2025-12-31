import { loadWrappedData } from './dataLoader.js';
import { renderSections } from './sectionRenderer.js';
import { initCardNavigator } from './cardNavigator.js';

export async function initScrollController() {
  // Enter wrapped mode immediately
  document.body.classList.add('mode-wrapped');

  const data = await loadWrappedData();
  renderSections(data);
  initCardNavigator();
}
