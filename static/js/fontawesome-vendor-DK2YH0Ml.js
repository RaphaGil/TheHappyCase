/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function $e(t,e,n){return(e=Ke(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Yt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Yt(Object(n),!0).forEach(function(a){$e(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Yt(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function qe(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Ke(t){var e=qe(t,"string");return typeof e=="symbol"?e:e+""}const Ut=()=>{};let zt={},de={},ge=null,pe={mark:Ut,measure:Ut};try{typeof window!="undefined"&&(zt=window),typeof document!="undefined"&&(de=document),typeof MutationObserver!="undefined"&&(ge=MutationObserver),typeof performance!="undefined"&&(pe=performance)}catch(t){}const{userAgent:Wt=""}=zt.navigator||{},N=zt,p=de,Ht=ge,K=pe;N.document;const E=!!p.documentElement&&!!p.head&&typeof p.addEventListener=="function"&&typeof p.createElement=="function",he=~Wt.indexOf("MSIE")||~Wt.indexOf("Trident/");var Qe=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Je=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,be={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Ze={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},ye=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],h="classic",nt="duotone",tn="sharp",en="sharp-duotone",ve=[h,nt,tn,en],nn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},an={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},rn=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),sn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},on=["fak","fa-kit","fakd","fa-kit-duotone"],Gt={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},cn=["kit"],ln={kit:{"fa-kit":"fak"}},fn=["fak","fakd"],un={kit:{fak:"fa-kit"}},Xt={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Q={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},mn=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],dn=["fak","fa-kit","fakd","fa-kit-duotone"],gn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},pn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},hn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},dt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},bn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],gt=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...mn,...bn],yn=["solid","regular","light","thin","duotone","brands"],xe=[1,2,3,4,5,6,7,8,9,10],vn=xe.concat([11,12,13,14,15,16,17,18,19,20]),xn=[...Object.keys(hn),...yn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Q.GROUP,Q.SWAP_OPACITY,Q.PRIMARY,Q.SECONDARY].concat(xe.map(t=>"".concat(t,"x"))).concat(vn.map(t=>"w-".concat(t))),An={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const C="___FONT_AWESOME___",pt=16,Ae="fa",ke="svg-inline--fa",F="data-fa-i2svg",ht="data-fa-pseudo-element",kn="data-fa-pseudo-element-pending",Nt="data-prefix",Lt="data-icon",Bt="fontawesome-i2svg",wn="async",Sn=["HTML","HEAD","STYLE","SCRIPT"],we=(()=>{try{return!0}catch(t){return!1}})();function $(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[h]}})}const Se=o({},be);Se[h]=o(o(o(o({},{"fa-duotone":"duotone"}),be[h]),Gt.kit),Gt["kit-duotone"]);const Cn=$(Se),bt=o({},sn);bt[h]=o(o(o(o({},{duotone:"fad"}),bt[h]),Xt.kit),Xt["kit-duotone"]);const Vt=$(bt),yt=o({},dt);yt[h]=o(o({},yt[h]),un.kit);const Ot=$(yt),vt=o({},pn);vt[h]=o(o({},vt[h]),ln.kit);$(vt);const Pn=Qe,Ce="fa-layers-text",En=Je,Mn=o({},nn);$(Mn);const zn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],ct=Ze,Nn=[...cn,...xn],G=N.FontAwesomeConfig||{};function Ln(t){var e=p.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function On(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}p&&typeof p.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=On(Ln(n));r!=null&&(G[a]=r)});const Pe={styleDefault:"solid",familyDefault:h,cssPrefix:Ae,replacementClass:ke,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};G.familyPrefix&&(G.cssPrefix=G.familyPrefix);const U=o(o({},Pe),G);U.autoReplaceSvg||(U.observeMutations=!1);const l={};Object.keys(Pe).forEach(t=>{Object.defineProperty(l,t,{enumerable:!0,set:function(e){U[t]=e,X.forEach(n=>n(l))},get:function(){return U[t]}})});Object.defineProperty(l,"familyPrefix",{enumerable:!0,set:function(t){U.cssPrefix=t,X.forEach(e=>e(l))},get:function(){return U.cssPrefix}});N.FontAwesomeConfig=l;const X=[];function In(t){return X.push(t),()=>{X.splice(X.indexOf(t),1)}}const z=pt,k={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Tn(t){if(!t||!E)return;const e=p.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=p.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const i=n[r],s=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(a=i)}return p.head.insertBefore(e,a),t}const Fn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function B(){let t=12,e="";for(;t-- >0;)e+=Fn[Math.random()*62|0];return e}function W(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function It(t){return t.classList?W(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function Ee(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _n(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(Ee(t[n]),'" '),"").trim()}function at(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Tt(t){return t.size!==k.size||t.x!==k.x||t.y!==k.y||t.rotate!==k.rotate||t.flipX||t.flipY}function Dn(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),s="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),c="rotate(".concat(e.rotate," 0 0)"),u={transform:"".concat(i," ").concat(s," ").concat(c)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:u,path:f}}function Rn(t){let{transform:e,width:n=pt,height:a=pt,startCentered:r=!1}=t,i="";return r&&he?i+="translate(".concat(e.x/z-n/2,"em, ").concat(e.y/z-a/2,"em) "):r?i+="translate(calc(-50% + ".concat(e.x/z,"em), calc(-50% + ").concat(e.y/z,"em)) "):i+="translate(".concat(e.x/z,"em, ").concat(e.y/z,"em) "),i+="scale(".concat(e.size/z*(e.flipX?-1:1),", ").concat(e.size/z*(e.flipY?-1:1),") "),i+="rotate(".concat(e.rotate,"deg) "),i}var jn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Me(){const t=Ae,e=ke,n=l.cssPrefix,a=l.replacementClass;let r=jn;if(n!==t||a!==e){const i=new RegExp("\\.".concat(t,"\\-"),"g"),s=new RegExp("\\--".concat(t,"\\-"),"g"),c=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(c,".".concat(a))}return r}let $t=!1;function lt(){l.autoAddCss&&!$t&&(Tn(Me()),$t=!0)}var Yn={mixout(){return{dom:{css:Me,insertCss:lt}}},hooks(){return{beforeDOMElementCreation(){lt()},beforeI2svg(){lt()}}}};const P=N||{};P[C]||(P[C]={});P[C].styles||(P[C].styles={});P[C].hooks||(P[C].hooks={});P[C].shims||(P[C].shims=[]);var w=P[C];const ze=[],Ne=function(){p.removeEventListener("DOMContentLoaded",Ne),tt=1,ze.map(t=>t())};let tt=!1;E&&(tt=(p.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(p.readyState),tt||p.addEventListener("DOMContentLoaded",Ne));function Un(t){E&&(tt?setTimeout(t,0):ze.push(t))}function q(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?Ee(t):"<".concat(e," ").concat(_n(n),">").concat(a.map(q).join(""),"</").concat(e,">")}function qt(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var ft=function(e,n,a,r){var i=Object.keys(e),s=i.length,c=n,u,f,m;for(a===void 0?(u=1,m=e[i[0]]):(u=0,m=a);u<s;u++)f=i[u],m=c(m,e[f],f,e);return m};function Wn(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const i=t.charCodeAt(n++);(i&64512)==56320?e.push(((r&1023)<<10)+(i&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function xt(t){const e=Wn(t);return e.length===1?e[0].toString(16):null}function Hn(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Kt(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function At(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=Kt(e);typeof w.hooks.addPack=="function"&&!a?w.hooks.addPack(t,Kt(e)):w.styles[t]=o(o({},w.styles[t]||{}),r),t==="fas"&&At("fa",e)}const{styles:V,shims:Gn}=w,Le=Object.keys(Ot),Xn=Le.reduce((t,e)=>(t[e]=Object.keys(Ot[e]),t),{});let Ft=null,Oe={},Ie={},Te={},Fe={},_e={};function Bn(t){return~Nn.indexOf(t)}function Vn(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!Bn(r)?r:null}const De=()=>{const t=a=>ft(V,(r,i,s)=>(r[s]=ft(i,a,{}),r),{});Oe=t((a,r,i)=>(r[3]&&(a[r[3]]=i),r[2]&&r[2].filter(c=>typeof c=="number").forEach(c=>{a[c.toString(16)]=i}),a)),Ie=t((a,r,i)=>(a[i]=i,r[2]&&r[2].filter(c=>typeof c=="string").forEach(c=>{a[c]=i}),a)),_e=t((a,r,i)=>{const s=r[2];return a[i]=i,s.forEach(c=>{a[c]=i}),a});const e="far"in V||l.autoFetchSvg,n=ft(Gn,(a,r)=>{const i=r[0];let s=r[1];const c=r[2];return s==="far"&&!e&&(s="fas"),typeof i=="string"&&(a.names[i]={prefix:s,iconName:c}),typeof i=="number"&&(a.unicodes[i.toString(16)]={prefix:s,iconName:c}),a},{names:{},unicodes:{}});Te=n.names,Fe=n.unicodes,Ft=rt(l.styleDefault,{family:l.familyDefault})};In(t=>{Ft=rt(t.styleDefault,{family:l.familyDefault})});De();function _t(t,e){return(Oe[t]||{})[e]}function $n(t,e){return(Ie[t]||{})[e]}function T(t,e){return(_e[t]||{})[e]}function Re(t){return Te[t]||{prefix:null,iconName:null}}function qn(t){const e=Fe[t],n=_t("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function L(){return Ft}const je=()=>({prefix:null,iconName:null,rest:[]});function Kn(t){let e=h;const n=Le.reduce((a,r)=>(a[r]="".concat(l.cssPrefix,"-").concat(r),a),{});return ve.forEach(a=>{(t.includes(n[a])||t.some(r=>Xn[a].includes(r)))&&(e=a)}),e}function rt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=h}=e,a=Cn[n][t];if(n===nt&&!t)return"fad";const r=Vt[n][t]||Vt[n][a],i=t in w.styles?t:null;return r||i||null}function Qn(t){let e=[],n=null;return t.forEach(a=>{const r=Vn(l.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function Qt(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function it(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=gt.concat(dn),i=Qt(t.filter(g=>r.includes(g))),s=Qt(t.filter(g=>!gt.includes(g))),c=i.filter(g=>(a=g,!ye.includes(g))),[u=null]=c,f=Kn(i),m=o(o({},Qn(s)),{},{prefix:rt(u,{family:f})});return o(o(o({},m),ea({values:t,family:f,styles:V,config:l,canonical:m,givenPrefix:a})),Jn(n,a,m))}function Jn(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const i=e==="fa"?Re(r):{},s=T(a,r);return r=i.iconName||s||r,a=i.prefix||a,a==="far"&&!V.far&&V.fas&&!l.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const Zn=ve.filter(t=>t!==h||t!==nt),ta=Object.keys(dt).filter(t=>t!==h).map(t=>Object.keys(dt[t])).flat();function ea(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:i={},config:s={}}=t,c=n===nt,u=e.includes("fa-duotone")||e.includes("fad"),f=s.familyDefault==="duotone",m=a.prefix==="fad"||a.prefix==="fa-duotone";if(!c&&(u||f||m)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&Zn.includes(n)&&(Object.keys(i).find(d=>ta.includes(d))||s.autoFetchSvg)){const d=rn.get(n).defaultShortPrefixId;a.prefix=d,a.iconName=T(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=L()||"fas"),a}class na{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(i=>{this.definitions[i]=o(o({},this.definitions[i]||{}),r[i]),At(i,r[i]);const s=Ot[h][i];s&&At(s,r[i]),De()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:i,iconName:s,icon:c}=a[r],u=c[2];e[i]||(e[i]={}),u.length>0&&u.forEach(f=>{typeof f=="string"&&(e[i][f]=c)}),e[i][s]=c}),e}}let Jt=[],j={};const Y={},aa=Object.keys(Y);function ra(t,e){let{mixoutsTo:n}=e;return Jt=t,j={},Object.keys(Y).forEach(a=>{aa.indexOf(a)===-1&&delete Y[a]}),Jt.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(i=>{typeof r[i]=="function"&&(n[i]=r[i]),typeof r[i]=="object"&&Object.keys(r[i]).forEach(s=>{n[i]||(n[i]={}),n[i][s]=r[i][s]})}),a.hooks){const i=a.hooks();Object.keys(i).forEach(s=>{j[s]||(j[s]=[]),j[s].push(i[s])})}a.provides&&a.provides(Y)}),n}function kt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(j[t]||[]).forEach(s=>{e=s.apply(null,[e,...a])}),e}function _(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(j[t]||[]).forEach(i=>{i.apply(null,n)})}function O(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Y[t]?Y[t].apply(null,e):void 0}function wt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||L();if(e)return e=T(n,e)||e,qt(Ye.definitions,n,e)||qt(w.styles,n,e)}const Ye=new na,ia=()=>{l.autoReplaceSvg=!1,l.observeMutations=!1,_("noAuto")},sa={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return E?(_("beforeI2svg",t),O("pseudoElements2svg",t),O("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;l.autoReplaceSvg===!1&&(l.autoReplaceSvg=!0),l.observeMutations=!0,Un(()=>{ca({autoReplaceSvgRoot:e}),_("watch",t)})}},oa={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:T(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=rt(t[0]);return{prefix:n,iconName:T(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(l.cssPrefix,"-"))>-1||t.match(Pn))){const e=it(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||L(),iconName:T(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=L();return{prefix:e,iconName:T(e,t)||t}}}},v={noAuto:ia,config:l,dom:sa,parse:oa,library:Ye,findIconDefinition:wt,toHtml:q},ca=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=p}=t;(Object.keys(w.styles).length>0||l.autoFetchSvg)&&E&&l.autoReplaceSvg&&v.dom.i2svg({node:e})};function st(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>q(n))}}),Object.defineProperty(t,"node",{get:function(){if(!E)return;const n=p.createElement("div");return n.innerHTML=t.html,n.children}}),t}function la(t){let{children:e,main:n,mask:a,attributes:r,styles:i,transform:s}=t;if(Tt(s)&&n.found&&!a.found){const{width:c,height:u}=n,f={x:c/u/2,y:.5};r.style=at(o(o({},i),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function fa(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:i}=t;const s=i===!0?"".concat(e,"-").concat(l.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:o(o({},r),{},{id:s}),children:a}]}]}function Dt(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:i,symbol:s,title:c,maskId:u,titleId:f,extra:m,watchable:g=!1}=t,{width:d,height:b}=n.found?n:e,M=fn.includes(a),I=[l.replacementClass,r?"".concat(l.cssPrefix,"-").concat(r):""].filter(R=>m.classes.indexOf(R)===-1).filter(R=>R!==""||!!R).concat(m.classes).join(" ");let x={children:[],attributes:o(o({},m.attributes),{},{"data-prefix":a,"data-icon":r,class:I,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(b)})};const S=M&&!~m.classes.indexOf("fa-fw")?{width:"".concat(d/b*16*.0625,"em")}:{};g&&(x.attributes[F]=""),c&&(x.children.push({tag:"title",attributes:{id:x.attributes["aria-labelledby"]||"title-".concat(f||B())},children:[c]}),delete x.attributes.title);const y=o(o({},x),{},{prefix:a,iconName:r,main:e,mask:n,maskId:u,transform:i,symbol:s,styles:o(o({},S),m.styles)}),{children:A,attributes:D}=n.found&&e.found?O("generateAbstractMask",y)||{children:[],attributes:{}}:O("generateAbstractIcon",y)||{children:[],attributes:{}};return y.children=A,y.attributes=D,s?fa(y):la(y)}function Zt(t){const{content:e,width:n,height:a,transform:r,title:i,extra:s,watchable:c=!1}=t,u=o(o(o({},s.attributes),i?{title:i}:{}),{},{class:s.classes.join(" ")});c&&(u[F]="");const f=o({},s.styles);Tt(r)&&(f.transform=Rn({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const m=at(f);m.length>0&&(u.style=m);const g=[];return g.push({tag:"span",attributes:u,children:[e]}),i&&g.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),g}function ua(t){const{content:e,title:n,extra:a}=t,r=o(o(o({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=at(a.styles);i.length>0&&(r.style=i);const s=[];return s.push({tag:"span",attributes:r,children:[e]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}const{styles:ut}=w;function St(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(l.cssPrefix,"-").concat(ct.GROUP)},children:[{tag:"path",attributes:{class:"".concat(l.cssPrefix,"-").concat(ct.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(l.cssPrefix,"-").concat(ct.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const ma={found:!1,width:512,height:512};function da(t,e){!we&&!l.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Ct(t,e){let n=e;return e==="fa"&&l.styleDefault!==null&&(e=L()),new Promise((a,r)=>{if(n==="fa"){const i=Re(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&ut[e]&&ut[e][t]){const i=ut[e][t];return a(St(i))}da(t,e),a(o(o({},ma),{},{icon:l.showMissingIcons&&t?O("missingIconAbstract")||{}:{}}))})}const te=()=>{},Pt=l.measurePerformance&&K&&K.mark&&K.measure?K:{mark:te,measure:te},H='FA "6.7.2"',ga=t=>(Pt.mark("".concat(H," ").concat(t," begins")),()=>Ue(t)),Ue=t=>{Pt.mark("".concat(H," ").concat(t," ends")),Pt.measure("".concat(H," ").concat(t),"".concat(H," ").concat(t," begins"),"".concat(H," ").concat(t," ends"))};var Rt={begin:ga,end:Ue};const J=()=>{};function ee(t){return typeof(t.getAttribute?t.getAttribute(F):null)=="string"}function pa(t){const e=t.getAttribute?t.getAttribute(Nt):null,n=t.getAttribute?t.getAttribute(Lt):null;return e&&n}function ha(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(l.replacementClass)}function ba(){return l.autoReplaceSvg===!0?Z.replace:Z[l.autoReplaceSvg]||Z.replace}function ya(t){return p.createElementNS("http://www.w3.org/2000/svg",t)}function va(t){return p.createElement(t)}function We(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?ya:va}=e;if(typeof t=="string")return p.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(i){a.setAttribute(i,t.attributes[i])}),(t.children||[]).forEach(function(i){a.appendChild(We(i,{ceFn:n}))}),a}function xa(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const Z={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(We(n),e)}),e.getAttribute(F)===null&&l.keepOriginalSource){let n=p.createComment(xa(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~It(e).indexOf(l.replacementClass))return Z.replace(t);const a=new RegExp("".concat(l.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const i=n[0].attributes.class.split(" ").reduce((s,c)=>(c===l.replacementClass||c.match(a)?s.toSvg.push(c):s.toNode.push(c),s),{toNode:[],toSvg:[]});n[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",i.toNode.join(" "))}const r=n.map(i=>q(i)).join(`
`);e.setAttribute(F,""),e.innerHTML=r}};function ne(t){t()}function He(t,e){const n=typeof e=="function"?e:J;if(t.length===0)n();else{let a=ne;l.mutateApproach===wn&&(a=N.requestAnimationFrame||ne),a(()=>{const r=ba(),i=Rt.begin("mutate");t.map(r),i(),n()})}}let jt=!1;function Ge(){jt=!0}function Et(){jt=!1}let et=null;function ae(t){if(!Ht||!l.observeMutations)return;const{treeCallback:e=J,nodeCallback:n=J,pseudoElementsCallback:a=J,observeMutationsRoot:r=p}=t;et=new Ht(i=>{if(jt)return;const s=L();W(i).forEach(c=>{if(c.type==="childList"&&c.addedNodes.length>0&&!ee(c.addedNodes[0])&&(l.searchPseudoElements&&a(c.target),e(c.target)),c.type==="attributes"&&c.target.parentNode&&l.searchPseudoElements&&a(c.target.parentNode),c.type==="attributes"&&ee(c.target)&&~zn.indexOf(c.attributeName))if(c.attributeName==="class"&&pa(c.target)){const{prefix:u,iconName:f}=it(It(c.target));c.target.setAttribute(Nt,u||s),f&&c.target.setAttribute(Lt,f)}else ha(c.target)&&n(c.target)})}),E&&et.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Aa(){et&&et.disconnect()}function ka(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const i=r.split(":"),s=i[0],c=i.slice(1);return s&&c.length>0&&(a[s]=c.join(":").trim()),a},{})),n}function wa(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=it(It(t));return r.prefix||(r.prefix=L()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=$n(r.prefix,t.innerText)||_t(r.prefix,xt(t.innerText))),!r.iconName&&l.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Sa(t){const e=W(t.attributes).reduce((r,i)=>(r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return l.autoA11y&&(n?e["aria-labelledby"]="".concat(l.replacementClass,"-title-").concat(a||B()):(e["aria-hidden"]="true",e.focusable="false")),e}function Ca(){return{iconName:null,title:null,titleId:null,prefix:null,transform:k,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function re(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=wa(t),i=Sa(t),s=kt("parseNodeAttributes",{},t);let c=e.styleParser?ka(t):[];return o({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:k,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:c,attributes:i}},s)}const{styles:Pa}=w;function Xe(t){const e=l.autoReplaceSvg==="nest"?re(t,{styleParser:!1}):re(t);return~e.extra.classes.indexOf(Ce)?O("generateLayersText",t,e):O("generateSvgReplacementMutation",t,e)}function Ea(){return[...on,...gt]}function ie(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!E)return Promise.resolve();const n=p.documentElement.classList,a=m=>n.add("".concat(Bt,"-").concat(m)),r=m=>n.remove("".concat(Bt,"-").concat(m)),i=l.autoFetchSvg?Ea():ye.concat(Object.keys(Pa));i.includes("fa")||i.push("fa");const s=[".".concat(Ce,":not([").concat(F,"])")].concat(i.map(m=>".".concat(m,":not([").concat(F,"])"))).join(", ");if(s.length===0)return Promise.resolve();let c=[];try{c=W(t.querySelectorAll(s))}catch(m){}if(c.length>0)a("pending"),r("complete");else return Promise.resolve();const u=Rt.begin("onTree"),f=c.reduce((m,g)=>{try{const d=Xe(g);d&&m.push(d)}catch(d){we||d.name==="MissingIcon"&&console.error(d)}return m},[]);return new Promise((m,g)=>{Promise.all(f).then(d=>{He(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),u(),m()})}).catch(d=>{u(),g(d)})})}function Ma(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Xe(t).then(n=>{n&&He([n],e)})}function za(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:wt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:wt(r||{})),t(a,o(o({},n),{},{mask:r}))}}const Na=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=k,symbol:a=!1,mask:r=null,maskId:i=null,title:s=null,titleId:c=null,classes:u=[],attributes:f={},styles:m={}}=e;if(!t)return;const{prefix:g,iconName:d,icon:b}=t;return st(o({type:"icon"},t),()=>(_("beforeDOMElementCreation",{iconDefinition:t,params:e}),l.autoA11y&&(s?f["aria-labelledby"]="".concat(l.replacementClass,"-title-").concat(c||B()):(f["aria-hidden"]="true",f.focusable="false")),Dt({icons:{main:St(b),mask:r?St(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:d,transform:o(o({},k),n),symbol:a,title:s,maskId:i,titleId:c,extra:{attributes:f,styles:m,classes:u}})))};var La={mixout(){return{icon:za(Na)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=ie,t.nodeCallback=Ma,t}}},provides(t){t.i2svg=function(e){const{node:n=p,callback:a=()=>{}}=e;return ie(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:i,prefix:s,transform:c,symbol:u,mask:f,maskId:m,extra:g}=n;return new Promise((d,b)=>{Promise.all([Ct(a,s),f.iconName?Ct(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(M=>{let[I,x]=M;d([e,Dt({icons:{main:I,mask:x},prefix:s,iconName:a,transform:c,symbol:u,maskId:m,title:r,titleId:i,extra:g,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:i,styles:s}=e;const c=at(s);c.length>0&&(a.style=c);let u;return Tt(i)&&(u=O("generateAbstractTransformGrouping",{main:r,transform:i,containerWidth:r.width,iconWidth:r.width})),n.push(u||r.icon),{children:n,attributes:a}}}},Oa={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return st({type:"layer"},()=>{_("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(i=>{a=a.concat(i.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(l.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Ia={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:i={}}=e;return st({type:"counter",content:t},()=>(_("beforeDOMElementCreation",{content:t,params:e}),ua({content:t.toString(),title:n,extra:{attributes:r,styles:i,classes:["".concat(l.cssPrefix,"-layers-counter"),...a]}})))}}}},Ta={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=k,title:a=null,classes:r=[],attributes:i={},styles:s={}}=e;return st({type:"text",content:t},()=>(_("beforeDOMElementCreation",{content:t,params:e}),Zt({content:t,transform:o(o({},k),n),title:a,extra:{attributes:i,styles:s,classes:["".concat(l.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:i}=n;let s=null,c=null;if(he){const u=parseInt(getComputedStyle(e).fontSize,10),f=e.getBoundingClientRect();s=f.width/u,c=f.height/u}return l.autoA11y&&!a&&(i.attributes["aria-hidden"]="true"),Promise.resolve([e,Zt({content:e.innerHTML,width:s,height:c,transform:r,title:a,extra:i,watchable:!0})])}}};const Fa=new RegExp('"',"ug"),se=[1105920,1112319],oe=o(o(o(o({},{FontAwesome:{normal:"fas",400:"fas"}}),an),An),gn),Mt=Object.keys(oe).reduce((t,e)=>(t[e.toLowerCase()]=oe[e],t),{}),_a=Object.keys(Mt).reduce((t,e)=>{const n=Mt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function Da(t){const e=t.replace(Fa,""),n=Hn(e,0),a=n>=se[0]&&n<=se[1],r=e.length===2?e[0]===e[1]:!1;return{value:xt(r?e[0]:e),isSecondary:a||r}}function Ra(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(Mt[n]||{})[r]||_a[n]}function ce(t,e){const n="".concat(kn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const s=W(t.children).filter(d=>d.getAttribute(ht)===e)[0],c=N.getComputedStyle(t,e),u=c.getPropertyValue("font-family"),f=u.match(En),m=c.getPropertyValue("font-weight"),g=c.getPropertyValue("content");if(s&&!f)return t.removeChild(s),a();if(f&&g!=="none"&&g!==""){const d=c.getPropertyValue("content");let b=Ra(u,m);const{value:M,isSecondary:I}=Da(d),x=f[0].startsWith("FontAwesome");let S=_t(b,M),y=S;if(x){const A=qn(M);A.iconName&&A.prefix&&(S=A.iconName,b=A.prefix)}if(S&&!I&&(!s||s.getAttribute(Nt)!==b||s.getAttribute(Lt)!==y)){t.setAttribute(n,y),s&&t.removeChild(s);const A=Ca(),{extra:D}=A;D.attributes[ht]=e,Ct(S,b).then(R=>{const Be=Dt(o(o({},A),{},{icons:{main:R,mask:je()},prefix:b,iconName:y,extra:D,watchable:!0})),ot=p.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(ot,t.firstChild):t.appendChild(ot),ot.outerHTML=Be.map(Ve=>q(Ve)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function ja(t){return Promise.all([ce(t,"::before"),ce(t,"::after")])}function Ya(t){return t.parentNode!==document.head&&!~Sn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(ht)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function le(t){if(E)return new Promise((e,n)=>{const a=W(t.querySelectorAll("*")).filter(Ya).map(ja),r=Rt.begin("searchPseudoElements");Ge(),Promise.all(a).then(()=>{r(),Et(),e()}).catch(()=>{r(),Et(),n()})})}var Ua={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=le,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=p}=e;l.searchPseudoElements&&le(n)}}};let fe=!1;var Wa={mixout(){return{dom:{unwatch(){Ge(),fe=!0}}}},hooks(){return{bootstrap(){ae(kt("mutationObserverCallbacks",{}))},noAuto(){Aa()},watch(t){const{observeMutationsRoot:e}=t;fe?Et():ae(kt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ue=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),i=r[0];let s=r.slice(1).join("-");if(i&&s==="h")return n.flipX=!0,n;if(i&&s==="v")return n.flipY=!0,n;if(s=parseFloat(s),isNaN(s))return n;switch(i){case"grow":n.size=n.size+s;break;case"shrink":n.size=n.size-s;break;case"left":n.x=n.x-s;break;case"right":n.x=n.x+s;break;case"up":n.y=n.y-s;break;case"down":n.y=n.y+s;break;case"rotate":n.rotate=n.rotate+s;break}return n},e)};var Ha={mixout(){return{parse:{transform:t=>ue(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ue(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:i}=e;const s={transform:"translate(".concat(r/2," 256)")},c="translate(".concat(a.x*32,", ").concat(a.y*32,") "),u="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),m={transform:"".concat(c," ").concat(u," ").concat(f)},g={transform:"translate(".concat(i/2*-1," -256)")},d={outer:s,inner:m,path:g};return{tag:"g",attributes:o({},d.outer),children:[{tag:"g",attributes:o({},d.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:o(o({},n.icon.attributes),d.path)}]}]}}}};const mt={x:0,y:0,width:"100%",height:"100%"};function me(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ga(t){return t.tag==="g"?t.children:[t]}var Xa={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?it(n.split(" ").map(r=>r.trim())):je();return a.prefix||(a.prefix=L()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:i,maskId:s,transform:c}=e;const{width:u,icon:f}=r,{width:m,icon:g}=i,d=Dn({transform:c,containerWidth:m,iconWidth:u}),b={tag:"rect",attributes:o(o({},mt),{},{fill:"white"})},M=f.children?{children:f.children.map(me)}:{},I={tag:"g",attributes:o({},d.inner),children:[me(o({tag:f.tag,attributes:o(o({},f.attributes),d.path)},M))]},x={tag:"g",attributes:o({},d.outer),children:[I]},S="mask-".concat(s||B()),y="clip-".concat(s||B()),A={tag:"mask",attributes:o(o({},mt),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,x]},D={tag:"defs",children:[{tag:"clipPath",attributes:{id:y},children:Ga(g)},A]};return n.push(D,{tag:"rect",attributes:o({fill:"currentColor","clip-path":"url(#".concat(y,")"),mask:"url(#".concat(S,")")},mt)}),{children:n,attributes:a}}}},Ba={provides(t){let e=!1;N.matchMedia&&(e=N.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:o(o({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const i=o(o({},r),{},{attributeName:"opacity"}),s={tag:"circle",attributes:o(o({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:o(o({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:o(o({},i),{},{values:"1;0;1;1;0;1;"})}),n.push(s),n.push({tag:"path",attributes:o(o({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:o(o({},i),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:o(o({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:o(o({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Va={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},$a=[Yn,La,Oa,Ia,Ta,Ua,Wa,Ha,Xa,Ba,Va];ra($a,{mixoutsTo:v});v.noAuto;v.config;v.library;v.dom;const Za=v.parse;v.findIconDefinition;v.toHtml;const tr=v.icon;v.layer;v.text;v.counter;/*!
 * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2026 Fonticons, Inc.
 */var er={prefix:"fab",iconName:"cc-paypal",icon:[576,512,[],"f1f4","M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7l-4.7 0c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0l-4.5 0c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80l0 352c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48L0 80C0 53.5 21.5 32 48 32l480 0c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28l-40 0c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4l19 0c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8l-19 0c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4l17.2 0c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zM253 322.1l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5l-19.2 0c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4l-18.7 0c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2l19.2 0c1.8-.1 3.5-1.1 4.5-2.6zM412.3 215.4c0-21-16.2-28-34.7-28l-39.7 0c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4l20.5 0c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8l-19 0c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4l17.3 0c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zM544 190.9c0-2-1.5-3.5-3.2-3.5l-18.5 0c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3 .5c0 1.8 1.5 3.5 3.5 3.5l16.5 0c2.5 0 5-2.9 5.2-5.7l16.2-101.2 0-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5 .1-9.8-6.9-15.5-16.2-15.5z"]},nr={prefix:"fab",iconName:"facebook",icon:[512,512,[62e3],"f09a","M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"]},ar={prefix:"fab",iconName:"cc-visa",icon:[576,512,[],"f1f0","M470.1 231.3s7.6 37.2 9.3 45l-33.4 0c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80l0 352c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48L0 80C0 53.5 21.5 32 48 32l480 0c26.5 0 48 21.5 48 48zM152.5 331.2l63.2-155.2-42.5 0-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1l-64.7 0-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135 42.5 0zm94.4 .2l25.2-155.4-40.2 0-25.1 155.4 40.1 0zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4l-32.4-155.4-31.1 0c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5 42.2 0s6.9-19.2 8.4-23.3l51.6 0c1.2 5.5 4.8 23.3 4.8 23.3l37.2 0z"]},rr={prefix:"fab",iconName:"tiktok",icon:[448,512,[],"e07b","M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"]},ir={prefix:"fab",iconName:"instagram",icon:[448,512,[],"f16d","M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"]},sr={prefix:"fab",iconName:"whatsapp",icon:[448,512,[],"f232","M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z"]},or={prefix:"fab",iconName:"etsy",icon:[384,512,[],"f2d7","M384 348c-1.8 10.7-13.8 110-15.5 132-117.9-4.3-219.9-4.7-368.5 0l0-25.5c45.5-8.9 60.6-8 61-35.2 1.8-72.3 3.5-244.1 0-322-1-28.5-12.1-26.8-61-36L0 35.8c73.9 2.4 255.9 8.6 363-3.8-3.5 38.2-7.8 126.5-7.8 126.5l-23.2 0C320.9 115.7 313.2 68 277.3 68l-137 0c-10.2 0-10.7 3.5-10.7 9.8l0 163.8c58 .5 88.5-2.5 88.5-2.5 29.8-1 27.6-8.5 40.7-65.3l25.8 0c-4.4 101.4-3.9 61.8-1.8 160.3L257 334c-9.2-40.1-9.1-61-39.5-61.5 0 0-21.5-2-88-2l0 139c0 26 14.3 38.3 44.3 38.3l89.3 0c63.6 0 66.6-25 98.7-99.8l22.2 0z"]},cr={prefix:"fab",iconName:"cc-amex",icon:[576,512,[],"f1f3","M0 432c0 26.5 21.5 48 48 48l480 0c26.5 0 48-21.5 48-48l0-1.1-61.7 0-31.9-35.1-31.9 35.1-203.7 0 0-163.8-65.8 0 81.7-184.7 78.6 0 28.1 63.2 0-63.2 97.2 0 16.9 47.6 17-47.6 75.5 0 0-2.4c0-26.5-21.5-48-48-48L48 32C21.5 32 0 53.5 0 80L0 432zm440.4-21.7l42.2-46.3 42 46.3 51.4 0-68-72.1 68-72.1-50.6 0-42 46.7-41.5-46.7-51.4 0 67.5 72.5-67.4 71.6 0-33.1-83 0 0-22.2 80.9 0 0-32.3-80.9 0 0-22.4 83 0 0-33.1-122 0 0 143.2 171.8 0zm96.3-72l39.3 41.9 0-83.3-39.3 41.4zm-36.3-92l36.9-100.6 0 100.6 38.7 0 0-143.3-60.2 0-32.2 89.3-31.9-89.3-61.2 0 0 143.1-63.2-143.1-51.2 0-62.4 143.3 43 0 11.9-28.7 65.9 0 12 28.7 82.7 0 0-100.3 36.8 100.3 34.4 0zM282 185.4l19.5-46.9 19.4 46.9-38.9 0z"]},lr={prefix:"fab",iconName:"cc-mastercard",icon:[576,512,[],"f1f1","M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7s4.4-11.7 11.2-11.7c6.6 0 11.2 5.2 11.2 11.7zM172.1 398.6c-7.1 0-11.2 5.2-11.2 11.7S165 422 172.1 422c6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7l19.1 0c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7s4.1 11.7 10.9 11.7 11.2-4.9 11.2-11.7c0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8s0-.5-.3-.8c-.3 0-.5-.3-1.1-.3l-1.6 0 0 3.5 .8 0 0-1.4 .3 0 1.1 1.4 .8 0-1.1-1.3zM576 81l0 352c0 26.5-21.5 48-48 48L48 481c-26.5 0-48-21.5-48-48L0 81C0 54.5 21.5 33 48 33l480 0c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zM288 329.4c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zM145.7 405.7c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4l0-4.4-8.2 0 0 36.7 8.2 0c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2l7.9 0c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2l8.2 0 0-23-.2 0zM190.6 392l-7.9 0 0 4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4l0 4.6 7.9 0 0-36.8zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1l0-16.6 13.1 0 0-7.4-13.1 0 0-11.2-8.2 0 0 11.2-7.6 0 0 7.3 7.6 0 0 16.7c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4l27.5 0c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zM338.9 392c-4.6-2-11.6-1.8-15.2 4.4l0-4.4-8.2 0 0 36.7 8.2 0 0-20.7c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zM416.2 392l-8.2 0 0 4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9l0 4.6 8.2 0 0-36.8zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4l0-4.4-7.9 0 0 36.7 7.9 0 0-20.7c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9l-7.9 0 0 19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9l0 4.6 7.9 0 0-51.7zm7.6-75.1l0 4.6 .8 0 0-4.6 1.9 0 0-.8-4.6 0 0 .8 1.9 0zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1s-.8-.5-1.1-.8c-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8s.5-.8 .8-1.1c.3-.6 .3-1.1 .3-1.4zm3.2-124.7l-1.4 0-1.6 3.5-1.6-3.5-1.4 0 0 5.4 .8 0 0-4.1 1.6 3.5 1.1 0 1.4-3.5 0 4.1 1.1 0 0-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"]};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const fr={prefix:"fas",iconName:"right-from-bracket",icon:[512,512,["sign-out-alt"],"f2f5","M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"]},qa={prefix:"fas",iconName:"bag-shopping",icon:[448,512,["shopping-bag"],"f290","M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]},ur=qa,mr={prefix:"fas",iconName:"chevron-up",icon:[512,512,[],"f077","M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"]},dr={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144],"f007","M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"]},Ka={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},gr=Ka,pr={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},Qa={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"]},hr=Qa,br={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},yr={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},vr={prefix:"fas",iconName:"arrow-left",icon:[448,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},xr={prefix:"fas",iconName:"tag",icon:[448,512,[127991],"f02b","M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Ar={prefix:"fas",iconName:"truck",icon:[640,512,[128666,9951],"f0d1","M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"]},Ja={prefix:"fas",iconName:"house",icon:[576,512,[127968,63498,63500,"home","home-alt","home-lg-alt"],"f015","M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"]},kr=Ja,wr={prefix:"fas",iconName:"font",icon:[448,512,[],"f031","M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z"]},Sr={prefix:"fas",iconName:"chevron-down",icon:[512,512,[],"f078","M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},Cr={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z"]},Pr={prefix:"fas",iconName:"plane",icon:[576,512,[],"f072","M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"]};export{xr as A,Ar as B,rr as a,nr as b,or as c,Sr as d,dr as e,ir as f,ur as g,fr as h,tr as i,br as j,sr as k,mr as l,ar as m,lr as n,cr as o,Za as p,er as q,Cr as r,pr as s,Pr as t,wr as u,vr as v,yr as w,gr as x,kr as y,hr as z};
