/*! For license information please see api.v2.js.LICENSE.txt */
(()=>{function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(){"use strict";t=function(){return n};var n={},r=Object.prototype,i=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var i=t&&t.prototype instanceof f?t:f,o=Object.create(i.prototype),a=new I(r||[]);return o._invoke=function(e,t,n){var r="suspendedStart";return function(i,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw o;return{value:void 0,done:!0}}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=E(a,n);if(s){if(s===h)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=d(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(e,n,a),o}function d(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}n.wrap=l;var h={};function f(){}function p(){}function v(){}var y={};u(y,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(P([])));g&&g!==r&&i.call(g,a)&&(y=g);var w=v.prototype=f.prototype=Object.create(y);function _(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function b(t,n){function r(o,a,s,c){var u=d(t[o],t,a);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==e(h)&&i.call(h,"__await")?n.resolve(h.__await).then((function(e){r("next",e,s,c)}),(function(e){r("throw",e,s,c)})):n.resolve(h).then((function(e){l.value=e,s(l)}),(function(e){return r("throw",e,s,c)}))}c(u.arg)}var o;this._invoke=function(e,t){function i(){return new n((function(n,i){r(e,t,n,i)}))}return o=o?o.then(i,i):i()}}function E(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method))return h;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var r=d(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,h;var i=r.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function k(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function P(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(i.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:O}}function O(){return{value:void 0,done:!0}}return p.prototype=v,u(w,"constructor",v),u(v,"constructor",p),p.displayName=u(v,c,"GeneratorFunction"),n.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},n.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,u(e,c,"GeneratorFunction")),e.prototype=Object.create(w),e},n.awrap=function(e){return{__await:e}},_(b.prototype),u(b.prototype,s,(function(){return this})),n.AsyncIterator=b,n.async=function(e,t,r,i,o){void 0===o&&(o=Promise);var a=new b(l(e,t,r,i),o);return n.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},_(w),u(w,c,"Generator"),u(w,a,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),n.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},n.values=P,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!e)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=i.call(o,"catchLoc"),c=i.call(o,"finallyLoc");if(s&&c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),k(n),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;k(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:P(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),h}},n}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,n,r,i,o,a){try{var s=e[o](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(){window.pandascripttag=window.pandascripttag||[];for(var e=0;e<window.pandascripttag.length;e++)window.pandascripttag[e]();window.pandascripttag.length=0}window.PANDA_ORIGIN="*",window.PandaPlayer=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"paused",!0),o(this,"audio",!0),o(this,"muted",!1),o(this,"pip",!1),o(this,"volume",1),o(this,"captions",{}),o(this,"currentTime",0),o(this,"iframe",null),o(this,"duration",0),o(this,"fullscreen",!1),o(this,"ready",!1),o(this,"video_external_id",""),o(this,"live_id",""),o(this,"video_hls",""),o(this,"comparison_id",""),o(this,"element_id",""),o(this,"video_width",""),o(this,"video_height",""),o(this,"outsideCtas",null),o(this,"speed",{options:[],selected:1}),o(this,"_callbackQueue",[]),o(this,"_receivedEventsQueue",[]),o(this,"colors",{primaryColor:"",captionsColor:"",captionsBackgroundColor:"",controlsColor:"",menuColor:""}),o(this,"element_id",""),o(this,"callbacks",[]),o(this,"library_id",""),o(this,"captureMessage",(function(e){var t=e.data;if(t.video===r.video_external_id||r.comparison_id===t.video){if("panda_error"===t.message&&r.onError&&r.onError(t),"panda_ready_comparison"===t.message&&(r.comparison_id=r.video_external_id,r.video_external_id=t.video_external_id),"panda_allData"===t.message){if(!t&&!t.playerData)return;r.paused=t.playerData.paused,r.audio=t.playerData.hasAudio,r.muted=t.playerData.muted,r.pip=t.playerData.pip,r.volume=t.playerData.volume,r.captions=t.playerData.captions,r.currentTime=t.playerData.currentTime,r.duration=t.playerData.duration,r.fullscreen=t.playerData.fullscreen,r.colors=t.playerData.colors,r.speed=t.playerData.speed,r.ready||0===r.duration||(r.ready=!0,r.onReady&&r.onReady(),r._callbackQueue.forEach((function(e){return e()})),r._callbackQueue=[])}r.ready?r._receivedEventsQueue.length?(r._receivedEventsQueue.forEach((function(e){r.callbacks.forEach((function(t){return t(e)}))})),r._receivedEventsQueue=[]):r.callbacks.forEach((function(e){return e(t)})):r._receivedEventsQueue.push(t)}})),this._onCreate(t,n)}var n,a,s,c;return n=e,a=[{key:"_onCreate",value:function(e,t){var n=this;this.element_id=e,t&&t.onError&&(this.onError=t.onError),t&&t.onReady&&(this.onReady=t.onReady);var r=document.getElementById(e);if(!r){var i=e.replace("panda-",""),o=document.getElementsByTagName("iframe");try{for(var a=0;a<o.length;a++)o[a].src&&new RegExp("".concat(i)).test(o[a].src)&&(o[a].id=e,r=o[a])}catch(t){var s=document.querySelector(e);s||console.error(t),r=s}if(!r)return console.error("PandaPlayer: element not found"),void(this.onError&&this.onError((function(){return new Error("PandaPlayer: element not found")})))}if("IFRAME"!==r.tagName||r.src){if("DIV"===r.tagName){var c="";if(!t)return void console.error("PandaPlayer: options is required");var u=t.playerConfigs,l=t.video_id,d=t.library_id,h=t.defaultStyle,f=t.video_external_id,p=t.url,v=t.fetchPriority;if(v=v?'fetchpriority="'.concat(v,'"'):"",u)for(var y=0,m=Object.keys(u);y<m.length;y++){var g=m[y];c+="&".concat(g,"=").concat(u[g])}var w=function(){var e,t="";n.video_external_id?(e=n.video_external_id,t=n.library_id):n.comparison_id?(e=n.comparison_id,t=n.video_hls.split("https://b-")[1].split(".tv")[0]):(e=n.live_id,t=n.video_hls.split("https://b-")[1].split(".tv")[0],c+="&isLive=true"),h?(r.style.cssText="position:relative;padding-top:56.25%;",r.innerHTML='\n          <iframe id="panda-'.concat(e,'" style="border:none;position:absolute;top:0;height:100%;width:100%" src="https://player-').concat(t,".tv.pandavideo.com.br/embed/?v=").concat(e).concat(c,'" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen=true ').concat(v,"></iframe>\n          ")):r.innerHTML='\n          <iframe id="panda-'.concat(e,'" src="https://player-').concat(t,".tv.pandavideo.com.br/embed/?v=").concat(e).concat(c,'" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen=true ').concat(v,'"></iframe>\n          '),r.querySelector("iframe").onload=function(){n.iframe=r.querySelector("iframe").contentWindow,window.addEventListener("message",n.captureMessage,!1)}};if(p)fetch("https://api-v2.pandavideo.com/oembed?url="+encodeURIComponent(p)).then((function(e){if(200===e.status)return e.json();throw new Error("PandaPlayer: invalid url")})).then((function(e){var t=e.video_external_id,r=e.pullzone_name,i=e.live_id,o=e.video_hls,a=e.video_ids,s=e.id,c=e.height,u=e.width;n.video_hls=o,n.live_id=i,n.video_external_id=t,n.library_id=r,n.video_width=u,n.video_height=c,a&&s&&(n.comparison_id=s),w()}));else{if(f)this.video_external_id=f;else{if(!l)return void console.error("PandaPlayer: video_external_id is required");this.video_external_id=l}if(!d)return void console.error("PandaPlayer: library_id is required");this.library_id=d,w()}}else if("IFRAME"===r.tagName&&r.src){var _,b=document.getElementById(e),E=document.querySelector(e);_=b&&b.contentWindow?b:E,this.iframe=_.contentWindow;var x=new URL(_.src);this.video_external_id=x.searchParams.get("v");var k=x.searchParams.get("l");this.library_id=k||x.hostname.split(".tv")[0].split("player-")[1],window.addEventListener("message",this.captureMessage,!1)}}else r.addEventListener("load",(function(){n._onCreate(e,t)}))}},{key:"loadWindowScreen",value:function(e){var t=e.panda_id_player,n=!1,r=0,i=0,o=0,a=document.getElementById(t).style.position,s=function(){var e=document.getElementById(t);r||(r=e.height?e.height:e.style.height),i||(i=e.width?e.width:e.style.width),o||(o=e.style.zIndex),e.style.height=window.innerHeight+"px",e.style.width=window.innerWidth+"px",e.style.position="fixed",e.style.overflow="hidden",e.style.left=0,e.style.top=0,e.style.zIndex=999999,document.body.style.overflow="hidden",n=!0},c=function(){var e=document.getElementById(t);e.style.height=r?r.match(/%/)?r:r+"px":"100%",e.style.width=i?i.match(/%/)?i:i+"px":"100%",e.style.position=a,e.style.zIndex=o,document.body.style.overflow="inherit",n=!1};this.onEvent((function(e){"panda_open_window_fullscreen"==e.message?s():"panda_close_window_fullscreen"==e.message&&c()})),document.onkeydown=function(e){27==(e=e||window.event).keyCode&&n&&c()},window.addEventListener("resize",(function(){n&&s()}))}},{key:"loadButtonInTime",value:(s=t().mark((function e(n){var i,o,a,s,c,u,l,d,h,f,p=this;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=n.time,o=n.divId,a=n.script,s=n.fetchApi,c=n.duration,u=n.isAsync,!s){e.next=23;break}if(l="https://config.tv.pandavideo.com.br/".concat(this.library_id,"/").concat(this.video_external_id,".json?date=").concat((new Date).getTime()),!u){e.next=20;break}return e.prev=4,e.next=7,fetch(l);case 7:return d=e.sent,e.next=10,d.json();case 10:h=e.sent,(f=h.outsideCta)&&f.length&&(this.outsideCtas=f,f.forEach((function(e){p.loadButtonInTime(r(r({},e),{},{time:parseInt(""+e.time,10)}))}))),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(4),console.error(e.t0);case 18:e.next=21;break;case 20:fetch(l).then((function(e){return e.json()})).then((function(e){if(e.outsideCta){var t=e.outsideCta;p.outsideCtas=t,t.forEach((function(e){p.loadButtonInTime(r(r({},e),{},{time:parseInt(""+e.time,10)}))}))}}));case 21:e.next=28;break;case 23:if(!o){e.next=28;break}if(document.getElementById(o)){e.next=27;break}return e.abrupt("return");case 27:this.onEvent((function(e){if("panda_timeupdate"===e.message){var t=e.currentTime;if(e.isMutedIndicator)return;var n=document.getElementById(o),r=document.getElementById("".concat(o,"_iframe"));try{c=parseInt(c+"",10)}catch(e){c=0}if(isNaN(i)&&(i=0),0===c&&(c=p.duration+1),t>=i&&t<i+c&&n&&!r){var s=document.createElement("iframe");s.style="border:0;width:100%;height:100%",s.id="".concat(o,"_iframe"),s.onload=function(){var e=document.getElementById("".concat(o,"_iframe")),t=/<script>(.|\n)*?<\/script>/gm,n=a.match(t),r=a.replace(t,"");if(n&&n.length){var i=n[0].replace("<script>","").replace("<\/script>",""),s=document.createElement("script");s.type="text/javascript",s.innerHTML=i,e.contentWindow.document.body.innerHTML="".concat(r),e.contentWindow.document.body.appendChild(s)}else e.contentWindow.document.body.innerHTML="".concat(r);e.contentWindow.document.body.style="padding:0;margin:0"},n.appendChild(s)}else if(t<i||t>i+c){var u=document.getElementById("".concat(o,"_iframe"));u&&u.remove()}}}));case 28:case"end":return e.stop()}}),e,this,[[4,15]])})),c=function(){var e=this,t=arguments;return new Promise((function(n,r){var o=s.apply(e,t);function a(e){i(o,n,r,a,c,"next",e)}function c(e){i(o,n,r,a,c,"throw",e)}a(void 0)}))},function(e){return c.apply(this,arguments)})},{key:"_setEvent",value:function(e){this.ready?e():this._callbackQueue.push(e)}},{key:"destroy",value:function(){var e=document.getElementById(this.element_id);"DIV"===e.tagName?document.getElementById(this.element_id).innerHTML="":e.remove(),this.callbacks=[],window.removeEventListener("message",this.captureMessage)}},{key:"getColors",value:function(){return this.colors}},{key:"getSpeed",value:function(){return this.speed}},{key:"setSpeed",value:function(e){var t=this;this._setEvent((function(){t.iframe.postMessage({type:"speed",parameter:e},window.PANDA_ORIGIN),t.speed.selected=e}))}},{key:"setColor",value:function(e,t){var n=this;this._setEvent((function(){n.iframe.postMessage({type:"colors",parameter:{colors:o({},e,t)}},window.PANDA_ORIGIN),n.colors[e]=t}))}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"getDuration",value:function(){return this.duration}},{key:"isFullscreen",value:function(){return this.fullscreen}},{key:"getVolume",value:function(){return this.volume}},{key:"isPaused",value:function(){return this.paused}},{key:"isMuted",value:function(){return this.muted}},{key:"isPIP",value:function(){return this.pip}},{key:"hasAudio",value:function(){return this.hasAudio}},{key:"play",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"play"},window.PANDA_ORIGIN),e.paused=!1}))}},{key:"pause",value:function(){var e=this;this.paused||this._setEvent((function(){e.iframe.postMessage({type:"pause"},window.PANDA_ORIGIN),e.paused=!0}))}},{key:"togglePlay",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"togglePlay"},window.PANDA_ORIGIN),e.isPaused=!e.isPaused}))}},{key:"showControls",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"enable_all_controls"},window.PANDA_ORIGIN)}))}},{key:"hideControls",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"disable_all_controls"},window.PANDA_ORIGIN)}))}},{key:"toggleFullscreen",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"fullscreen.toggle"},window.PANDA_ORIGIN),e.fullscreen=!e.fullscreen}))}},{key:"exitFullscreen",value:function(){var e=this;this._setEvent((function(){e.iframe.postMessage({type:"fullscreen.exit"},window.PANDA_ORIGIN),e.fullscreen=!1}))}},{key:"setCurrentTime",value:function(e){var t=this;this._setEvent((function(){t.iframe.postMessage({type:"currentTime",parameter:e},window.PANDA_ORIGIN),t.currentTime=e}))}},{key:"setVolume",value:function(e){var t=this;this._setEvent((function(){t.iframe.postMessage({type:"volume",parameter:e},window.PANDA_ORIGIN),t.volume=e}))}},{key:"getCaptions",value:function(){return this.captions}},{key:"onEvent",value:function(e){this.callbacks.push(e)}}],a&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(n.prototype,a),Object.defineProperty(n,"prototype",{writable:!1}),e}(),window.pandascripttag=window.pandascripttag||[],0!==window.pandascripttag.length&&a(),window.pandascripttag.push=function(){Array.prototype.push.apply(this,arguments),a()}})();