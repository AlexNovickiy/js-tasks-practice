import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const t=document.querySelectorAll(".sound-button");t.forEach(e=>{e.addEventListener("click",()=>{const s=e.getAttribute("data-sound");new Audio(`/${s}.mp3`).play(),e.classList.add("clicked"),setTimeout(()=>{e.classList.remove("clicked")},200)})});
//# sourceMappingURL=sound-player.js.map
