window.addEventListener("load",(function(){document.querySelectorAll(".block--webstories .block__news__item a").forEach((function(e){e.addEventListener("click",(function(n){n.preventDefault(),function(e){const n=document.querySelector("body"),t=`\n            <button class="webstories__close">&times;</button>\n            <iframe\n                allowfullscreen\n                loading='lazy'\n                src="${e.href}"\n            ></iframe>\n        `,o=document.createElement("div");o.classList.add("webstories__modal"),o.innerHTML=t,n.appendChild(o)}(e),function(){const e=document.querySelector(".webstories__close"),n=document.querySelector(".webstories__modal");e.addEventListener("click",(function(e){n.remove()}))}()}))}))}));