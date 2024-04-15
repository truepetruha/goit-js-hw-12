import{a as v,i as f,S as w}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const E="https://pixabay.com/api",q="41849458-2d98265cf06659a45ba73a30c";async function g(s,t=1){try{return(await v.get(`${E}/`,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}})).data}catch{throw new Error("Sorry! Try later! Server not working")}}const o="is-hidden";function h(s){f.error({title:"Error",titleSize:"30",messageSize:"25",message:s})}function P(s){s.reset()}const x=new w(".gallery a",{captionsData:"alt",captionDelay:250}),M=document.querySelector(".js-search-form"),m=document.querySelector(".list-photo"),i=document.querySelector('[data-action="load-more"]'),c=document.querySelector(".loader");let d=1,p=0,u="";document.addEventListener("DOMContentLoaded",()=>{i.classList.add(o)});M.addEventListener("submit",$);i.addEventListener("click",y);async function $(s){s.preventDefault(),m.innerHTML="",c.classList.remove(o),d=1;const t=s.currentTarget;if(u=t.elements.query.value.trim(),!u){c.classList.add(o),i.classList.add(o),h("Please search for something");return}try{const{hits:a,totalHits:n}=await g(u);p=Math.ceil(n/15),L(a,m),a.length>0&&a.length!==n&&d<=p?i.classList.remove(o):a.length?i.classList.add(o):(i.classList.add(o),h("Sorry, there are no images matching your search query. Please try again!"))}catch(a){console.log(a)}finally{c.classList.add(o),P(t)}}async function y(){d+=1,c.classList.remove(o),i.classList.add(o);const s=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:t}=await g(u,d);L(t,m)}catch(t){console.error(t)}finally{window.scrollBy({top:s.height*2,left:0,behavior:"smooth"}),c.classList.add(o),i.classList.remove(o),d===p&&(i.classList.add(o),i.removeEventListener("click",y),f.show({title:"Hey",titleSize:"30",messageSize:"25",color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}}function L(s){const t=s.map(({webformatURL:a,largeImageURL:n,tags:e,likes:r,views:l,comments:b,downloads:S})=>`<li class="gallery-item">
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
   <p class="img-text">Likes: <br><span>${r}</span></p>
   <p class="img-text">Views: <br><span>${l}</span></p>
   <p class="img-text">Comment: <br><span>${b}</span></p>
   <p class="img-text">Downloads: <br><span>${S}</span></p>
   </li>
   </ul>
        </li>`).join("");m.insertAdjacentHTML("beforeend",t),x.refresh()}
//# sourceMappingURL=commonHelpers.js.map
