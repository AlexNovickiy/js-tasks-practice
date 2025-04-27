import"./assets/modulepreload-polyfill-B5Qt9EMX.js";const b="/js-tasks-practice/assets/Darin%20-%20Step%20Up-BZsnQ9FE.mp3",j="/js-tasks-practice/assets/Kesha%20-%20Tik%20Tok-BQidp_IK.mp3",B="/js-tasks-practice/assets/MGMT%20-%20Little%20Dark%20Age-eqqCEtIb.mp3",x="/js-tasks-practice/assets/Disturbed%20-%20Down%20With%20The%20Sickness-BmAPK09I.mp3",K="/js-tasks-practice/assets/DVRST%20feat.%20%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%A1%D0%BA%D0%BB%D1%8F%D1%80%20_%20Atomic%20Heart%20-%20Komarovo%20(DVRST%20Phonk%20Remix)-Dl-xHHAy.mp3",M="/js-tasks-practice/assets/fifty-fifty-cupid-twin-ver-(meloua.com)-Bfrm86sP.mp3",$="/js-tasks-practice/assets/fireflight_-_so_help_me_god_(z3.fm)-D5QlN29M.mp3",E="/js-tasks-practice/assets/Gorillaz-Cd8R3OJU.mp3",L="/js-tasks-practice/assets/jaymes-young-infinity-(meloua.com)-BEUPgfGN.mp3",q="/js-tasks-practice/assets/Kenshi%20Yonezu%20Kick%20Back-h-S6VwSW.mp3",C="/js-tasks-practice/assets/King%20Gnu%20Specialz-DJuKaxH1.mp3",P="/js-tasks-practice/assets/Loreen%20-%20Tattoo-DgQcCCst.mp3",V="/js-tasks-practice/assets/Marshmello-Friends-DPmAK6rl.mp3",A="/js-tasks-practice/assets/Cover-M3KVNxpC.png",a=[{title:"Step Up",artist:"Darin",src:b},{title:"Tik Tok",artist:"Kesha",src:j},{title:"Little Dark Age",artist:"MGMT",src:B},{title:"Down With The Sickness",artist:"Disturbed",src:x},{title:"Komarovo (DVRST Phonk Remix)",artist:"DVRST",src:K},{title:"Cupid (Twin Ver)",artist:"Fifty Fifty",src:M},{title:"So Help Me God",artist:"Fireflight",src:$},{title:"Gorillaz",artist:"Gorillaz",src:E},{title:"Infinity",artist:"Jaymes Young",src:L},{title:"Kick Back",artist:"Kenshi Yonezu",src:q},{title:"Specialz",artist:"King Gnu",src:C},{title:"Tattoo",artist:"Loreen",src:P},{title:"Friends",artist:"Marshmello",src:V}],o=document.querySelector(".container-audio-player"),p=document.querySelector("#track-select");let n=Math.floor(Math.random()*a.length),i=!1,e=new Audio(a[n].src);function v(){o.innerHTML=`
    <div class="audio-cover">
      <img src="${A}" alt="Cover" />
    </div>
    <div class="audio-info">
      <h2 class="audio-title">${a[n].title}</h2>
      <p class="audio-artist">${a[n].artist}</p>
    </div>
    <div class="audio-controls">
      <button class="btn-prev">⏮</button>
      <button class="btn-play">${i?"⏸":"▶"}</button>
      <button class="btn-next">⏭</button>
    </div>
    <div class="audio-progress">
      <span class="current-time">0:00</span>
      <input type="range" class="progress-bar" min="0" max="100" value="0" />
      <span class="total-time">0:00</span>
    </div>
    <div class="audio-volume">
      <label for="volume-control">Volume:</label>
      <input type="range" id="volume-control" min="0" max="1" step="0.01" value="${e.volume}" />
    </div>
  `;const t=o.querySelector(".btn-play"),s=o.querySelector(".btn-prev"),r=o.querySelector(".btn-next"),c=o.querySelector(".progress-bar"),l=o.querySelector("#volume-control"),T=o.querySelector(".current-time"),h=o.querySelector(".total-time");t.addEventListener("click",k),s.addEventListener("click",z),r.addEventListener("click",m),c.addEventListener("input",G),l.addEventListener("input",w),e.addEventListener("timeupdate",()=>{const S=d(e.currentTime),D=d(e.duration);T.textContent=S,h.textContent=D||"0:00",c.value=e.currentTime/e.duration*100||0}),e.addEventListener("ended",m)}function g(){p.innerHTML=a.map((t,s)=>`
      <option value="${s}" ${s===n?"selected":""}>
        ${t.title} - ${t.artist}
      </option>
    `).join(""),p.addEventListener("change",t=>{n=parseInt(t.target.value,10),u()})}function k(){i?e.pause():e.play(),i=!i;const t=o.querySelector(".btn-play");t.textContent=i?"⏸":"▶"}function z(){n=(n-1+a.length)%a.length,u()}function m(){n=(n+1)%a.length,u()}function u(){const t=e.volume;e.pause(),i=!1,e=new Audio(a[n].src),e.volume=t,v(),g(),y(),k()}function G(t){const s=t.target.value/100*e.duration;e.currentTime=s}function f(t,s){const r=t.min,c=t.max,l=`${(s-r)/(c-r)*100}%`;t.style.background=`linear-gradient(to right, #4caf50 ${l}, #ccc ${l})`}function w(t){const s=t.target;e.volume=s.value,f(s,s.value)}function y(){const t=document.querySelector("#volume-control");f(t,e.volume)}function d(t){if(isNaN(t))return"0:00";const s=Math.floor(t/60),r=Math.floor(t%60);return`${s}:${r<10?"0":""}${r}`}v();g();y();
//# sourceMappingURL=audio-player.js.map
