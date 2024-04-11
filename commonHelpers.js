import{S as v,i as c,a as w}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const z=new v(".gallery a",{captionsData:"alt",captionDelay:250}),E=document.querySelector(".js-search-form"),u=document.querySelector(".list-photo"),a=document.querySelector('[data-action="load-more"]'),g=document.querySelector(".loader"),h=document.querySelector(".loader-load-more"),o="is-hidden";let d=1,y=0,m="";const q="https://pixabay.com/api",P="41849458-2d98265cf06659a45ba73a30c";a.classList.add(o);E.addEventListener("submit",x);a.addEventListener("click",p);async function x(i){i.preventDefault(),u.innerHTML="",g.classList.remove(o),d=1;const t=i.currentTarget;if(m=t.elements.query.value.trim(),!m){g.classList.add(o),a.classList.add(o),c.show({title:"Error",titleSize:"30",messageSize:"25",color:"yellow",message:"Please search for something"});return}try{const{hits:r,totalHits:l}=await f(m);y=Math.ceil(l/40),L(r,u),r.length>0&&r.length!==l?a.classList.remove(o):r.length?a.classList.add(o):(a.classList.add(o),c.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry, there are no images matching your search query. Please try again!"}))}catch(r){console.error(r),c.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry! Try later! Server not working"})}finally{g.classList.add(o),t.reset()}}async function f(i,t=1){try{return(await w.get(`${q}/`,{params:{key:P,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:t}})).data}catch(r){console.error(r),c.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry! Try later! Server not working"}),console.error(r.message)}}async function p(){d+=1,h.classList.remove(o),a.classList.add(o);const i=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:t}=await f(m,d);L(t,u)}catch(t){console.error(t)}finally{window.scrollBy({top:i.height*2,left:0,behavior:"smooth"}),h.classList.add(o),a.classList.remove(o),d===y&&(a.classList.add(o),a.removeEventListener("click",p),c.show({title:"Hey",titleSize:"30",messageSize:"25",color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}}a.addEventListener("click",p);function L(i){const t=i.map(({webformatURL:r,largeImageURL:l,tags:e,likes:s,views:n,comments:S,downloads:b})=>`<li class="gallery-item">
          <a class="gallery-link" href="${l}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${e}"
              width="360"
            />
          </a>
          <ul class="img-list">
  <li class="img-info">
   <p class="img-text">Likes: <br><span>${s}</span></p>
   <p class="img-text">Views: <br><span>${n}</span></p>
   <p class="img-text">Comment: <br><span>${S}</span></p>
   <p class="img-text">Downloads: <br><span>${b}</span></p>
   </li>
   </ul>
        </li>`).join("");u.insertAdjacentHTML("beforeend",t),z.refresh()}
//# sourceMappingURL=commonHelpers.js.map
