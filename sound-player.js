import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const o=document.querySelectorAll(".sound-button");o.forEach(e=>{e.addEventListener("click",()=>{const d=e.getAttribute("data-sound");new Audio(`./audio/${d}.mp3`).play(),e.classList.add("clicked"),setTimeout(()=>{e.classList.remove("clicked")},200)})});
//# sourceMappingURL=sound-player.js.map
