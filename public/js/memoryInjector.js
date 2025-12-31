// js/memoryInjector.js

export function injectMemoryImages() {
  const memoryLayer = document.getElementById('memory-layer');
  
  if (!memoryLayer) {
    console.warn('⚠️ Memory layer element not found');
    return;
  }

  // Your 6 images from /images/ folder
  const memoryImages = [
    './images/image1.png',
    './images/image2.png',
    './images/image3.png',
    './images/image4.png',
    './images/image5.png',
    './images/image6.png'
  ];

  // Clear any existing content
  memoryLayer.innerHTML = '';

  // Create and inject each memory image
  memoryImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Memory ${index + 1}`;
    img.className = `memory memory-${index + 1}`;
    
    // Handle loading errors gracefully
    img.onerror = () => {
      console.warn(`❌ Failed to load: ${src}`);
      img.style.display = 'none';
    };
    
    img.onload = () => {
      console.log(`✅ Loaded: ${src}`);
    };
    
    memoryLayer.appendChild(img);
  });

  console.log(`✅ ${memoryImages.length} memory images injected into layer`);
}