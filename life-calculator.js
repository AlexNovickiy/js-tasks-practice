import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as d}from"./assets/vendor-BxDhZ0sI.js";const p=document.querySelector(".form-life-calculator"),f=p.querySelector(".results");let r,u;function o(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}p.addEventListener("submit",D);const h=[{condition:(e,t,s)=>!e||!t||!s,message:"Please fill in all fields"},{condition:(e,t,s)=>{const n=new Date().getFullYear(),a=new Date().getMonth()+1,l=new Date().getDate();return e>n||e===n&&t>a||e===n&&t===a&&s>l||e<1900},message:"Please enter a valid date that is not in the future"},{condition:(e,t)=>t<1||t>12,message:"Please enter a valid month"},{condition:(e,t,s)=>s<1||s>31,message:"Please enter a valid day"}];function D(e){e.preventDefault();const t=Object.fromEntries(new FormData(e.currentTarget));for(const{condition:n,message:a}of h)if(n(+t.inputYear,+t.inputMonth,+t.inputDay)){d.error({title:"Error",message:a,position:"topRight",messageColor:"#fff",titleColor:"#fff",backgroundColor:"#ff0000"}),clearInterval(u),f.innerHTML="";return}const s=new Date(t.inputYear,t.inputMonth-1,t.inputDay);r={years:o(),days:o(),hours:o(),minutes:o(),seconds:o()},c(s),u=setInterval(()=>c(s),1e3)}function c(e){const s=new Date-e,n=Math.floor(s/1e3),a=Math.floor(n/60),l=Math.floor(a/60),i=Math.floor(l/24),m=Math.floor(i/365.25);f.innerHTML=`<li class="item-results">
                  <span>Вам</span>
                  <span class="result-years span-output-values" style="color: ${r.years}">${m}</span> років
                </li>
                <li class="item-results">
                  <span>Ви прожили</span>
                  <span class="result-days span-output-values" style="color: ${r.days}">${i}</span> днів
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-hours span-output-values" style="color: ${r.hours}">${l}</span> годин
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-minutes span-output-values" style="color: ${r.minutes}">${a}</span> хвилин
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-seconds span-output-values" style="color: ${r.seconds}">${n}</span> секунд
                </li>`}
//# sourceMappingURL=life-calculator.js.map
