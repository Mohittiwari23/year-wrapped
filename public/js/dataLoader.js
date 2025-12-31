// js/dataLoader.js

export async function loadWrappedData() {
  const response = await fetch("./year_wrapped.json", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to load year_wrapped.json (${response.status})`);
  }

  return await response.json();
}
