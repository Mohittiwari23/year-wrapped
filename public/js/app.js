// js/app.js

import { loadWrappedData } from "./dataLoader.js";
import { renderSections } from "./sectionRenderer.js";
import { initCardNavigator } from "./cardNavigator.js";
import { renderFinale } from "./finaleRenderer.js";
import { injectMemoryImages } from "./memoryInjector.js"; // ✅ NEW

async function init() {
  try {
    document.body.classList.add("mode-wrapped");

    const data = await loadWrappedData();
    renderSections(data);
    initCardNavigator();
    renderFinale();
    
    // ✅ INJECT BACKGROUND MEMORY IMAGES
    injectMemoryImages();

    // 🔒 SCROLL SIGNAL FOR MEMORY (page-level scroll)
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      document.body.style.setProperty("--page-scroll-progress", progress.toFixed(4));
    });

  } catch (err) {
    console.error("App init failed:", err);
  }
}

init();