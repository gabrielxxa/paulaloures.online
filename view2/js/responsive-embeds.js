function twentytwentyoneResponsiveEmbeds(){var e,t;document.querySelectorAll("iframe").forEach((function(n){n.width&&n.height&&(e=parseFloat(n.width)/parseFloat(n.height),t=parseFloat(window.getComputedStyle(n.parentElement,null).width.replace("px","")),n.style.maxWidth="100%",n.style.maxHeight=Math.round(t/e).toString()+"px")}))}twentytwentyoneResponsiveEmbeds(),window.onresize=twentytwentyoneResponsiveEmbeds;