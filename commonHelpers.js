import{S as v,i as m,a as w}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const q=new v(".gallery a",{captionsData:"alt",captionDelay:250}),E=document.querySelector(".js-search-form"),u=document.querySelector(".list-photo"),a=document.querySelector('[data-action="load-more"]'),g=document.querySelector(".loader"),h=document.querySelector(".loader-load-more"),o="is-hidden";let c=1,p=0,d="";const z="https://pixabay.com/api",P="41849458-2d98265cf06659a45ba73a30c";document.addEventListener("DOMContentLoaded",()=>{a.classList.add(o)});E.addEventListener("submit",x);a.addEventListener("click",y);async function x(i){i.preventDefault(),u.innerHTML="",g.classList.remove(o),c=1;const t=i.currentTarget;if(d=t.elements.query.value.trim(),!d){g.classList.add(o),a.classList.add(o),m.show({title:"Error",titleSize:"30",messageSize:"25",color:"yellow",message:"Please search for something"});return}try{const{hits:s,totalHits:l}=await f(d);p=Math.ceil(l/15),L(s,u),s.length>0&&s.length!==l&&c<=p?a.classList.remove(o):s.length?a.classList.add(o):(a.classList.add(o),m.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry, there are no images matching your search query. Please try again!"}))}catch(s){console.log(s)}finally{g.classList.add(o),t.reset()}}async function f(i,t=1){try{return(await w.get(`${z}/`,{params:{key:P,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}})).data}catch(s){m.error({title:"Error",titleSize:"30",messageSize:"25",message:"Sorry! Try later! Server not working"}),console.error(s.message)}}async function y(){c+=1,h.classList.remove(o),a.classList.add(o);const i=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:t}=await f(d,c);L(t,u)}catch(t){console.error(t)}finally{window.scrollBy({top:i.height*2,left:0,behavior:"smooth"}),h.classList.add(o),a.classList.remove(o),c===p&&(a.classList.add(o),a.removeEventListener("click",y),m.show({title:"Hey",titleSize:"30",messageSize:"25",color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}}function L(i){const t=i.map(({webformatURL:s,largeImageURL:l,tags:e,likes:r,views:n,comments:S,downloads:b})=>`<li class="gallery-item">
          <a class="gallery-link" href="${l}">
            <img
              class="gallery-image"
              src="${s}"
              alt="${e}"
              width="360"
            />
          </a>
          <ul class="img-list">
  <li class="img-info">
   <p class="img-text">Likes: <br><span>${r}</span></p>
   <p class="img-text">Views: <br><span>${n}</span></p>
   <p class="img-text">Comment: <br><span>${S}</span></p>
   <p class="img-text">Downloads: <br><span>${b}</span></p>
   </li>
   </ul>
        </li>`).join("");u.insertAdjacentHTML("beforeend",t),q.refresh()}
//# sourceMappingURL=commonHelpers.js.map
