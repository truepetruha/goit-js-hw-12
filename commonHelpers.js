import{a as w,i as g,S as q}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const E="https://pixabay.com/api",P="41849458-2d98265cf06659a45ba73a30c";async function y(r,t=1){try{return(await w.get(`${E}/`,{params:{key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}})).data}catch{throw new Error("Sorry! Try later! Server not working")}}const o="is-hidden";function h(r){g.error({title:"Error",titleSize:"30",messageSize:"25",message:r})}function x(r){r.reset()}const M=new q(".gallery a",{captionsData:"alt",captionDelay:250}),$=document.querySelector(".js-search-form"),u=document.querySelector(".list-photo"),i=document.querySelector('[data-action="load-more"]'),m=document.querySelector(".loader"),f=document.querySelector(".loader-load-more");let c=1,p=0,d="";document.addEventListener("DOMContentLoaded",()=>{i.classList.add(o)});$.addEventListener("submit",O);i.addEventListener("click",L);async function O(r){r.preventDefault(),u.innerHTML="",m.classList.remove(o),c=1;const t=r.currentTarget;if(d=t.elements.query.value.trim(),!d){m.classList.add(o),i.classList.add(o),h("Please search for something");return}try{const{hits:a,totalHits:n}=await y(d);p=Math.ceil(n/15),S(a,u),a.length>0&&a.length!==n&&c<=p?i.classList.remove(o):a.length?i.classList.add(o):(i.classList.add(o),h("Sorry, there are no images matching your search query. Please try again!"))}catch(a){console.log(a)}finally{m.classList.add(o),x(t)}}async function L(){c+=1,f.classList.remove(o),i.classList.add(o);const r=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:t}=await y(d,c);S(t,u)}catch(t){console.error(t)}finally{window.scrollBy({top:r.height*2,left:0,behavior:"smooth"}),f.classList.add(o),i.classList.remove(o),c===p&&(i.classList.add(o),i.removeEventListener("click",L),g.show({title:"Hey",titleSize:"30",messageSize:"25",color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}}function S(r){const t=r.map(({webformatURL:a,largeImageURL:n,tags:e,likes:s,views:l,comments:b,downloads:v})=>`<li class="gallery-item">
          <a class="gallery-link" href="${n}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${e}"
              width="360"
            />
          </a>
          <ul class="img-list">
  <li class="img-info">
   <p class="img-text">Likes: <br><span>${s}</span></p>
   <p class="img-text">Views: <br><span>${l}</span></p>
   <p class="img-text">Comment: <br><span>${b}</span></p>
   <p class="img-text">Downloads: <br><span>${v}</span></p>
   </li>
   </ul>
        </li>`).join("");u.insertAdjacentHTML("beforeend",t),M.refresh()}
//# sourceMappingURL=commonHelpers.js.map
