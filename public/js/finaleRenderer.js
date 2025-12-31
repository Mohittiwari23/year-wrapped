// js/finaleRenderer.js

export function renderFinale() {
  const finale = document.getElementById("finale");
  if (!finale) return;

  const wrapper = document.createElement("div");
  wrapper.className = "finale-inner";

  const poem = document.createElement("p");
  poem.className = "finale-poem";
  poem.innerHTML = `
    <span class="poem-lead">We didn’t keep everything.</span><br><br>
    Only what stayed.<br><br>
    The ordinary days.<br>
    The quiet returns.<br><br>
    The way it felt<br>
    to be here,<br>
    at the same time.<br><br><br><br><br><br><br><br><br><br><br><br>
    Looking forward to many more years together :)
  `;


  wrapper.appendChild(poem);
  finale.appendChild(wrapper);
}
