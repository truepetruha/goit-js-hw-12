import{a as w,i as f,S as v}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const P="https://pixabay.com/api",q="41849458-2d98265cf06659a45ba73a30c";async function g(s,t=1,o=15){try{return(await w.get(`${P}/`,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:o,page:t}})).data}catch{throw new Error("Sorry! Try later! Server not working")}}const a="is-hidden";function h(s){f.error({title:"Error",titleSize:"30",messageSize:"25",message:s})}function x(s){s.reset()}const E=new v(".gallery a",{captionsData:"alt",captionDelay:250}),$=document.querySelector(".js-search-form"),m=document.querySelector(".list-photo"),n=document.querySelector('[data-action="load-more"]'),d=document.querySelector(".loader"),y=15;let l=1,p=0,u="";$.addEventListener("submit",M);n.addEventListener("click",z);async function M(s){s.preventDefault(),m.innerHTML="",d.classList.remove(a),l>1&&(l=1);const t=s.currentTarget;if(u=t.elements.query.value.trim(),!u){d.classList.add(a),n.classList.add(a),h("Please search for something");return}try{const{hits:o,totalHits:i}=await g(u,l,y);p=Math.ceil(i/15),L(o,m),o.length>0&&o.length!==i&&l<=p?n.classList.remove(a):o.length?n.classList.add(a):(n.classList.add(a),h("Sorry, there are no images matching your search query. Please try again!"))}catch(o){console.log(o)}finally{d.classList.add(a),x(t)}}async function z(){l+=1,d.classList.remove(a),n.classList.add(a);const s=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:t}=await g(u,l,y);L(t,m)}catch(t){console.error(t)}finally{window.scrollBy({top:s.height*2,left:0,behavior:"smooth"}),d.classList.add(a),n.classList.remove(a),l===p&&(n.classList.add(a),f.show({title:"Hey",titleSize:"30",messageSize:"25",color:"blue",position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}}function L(s){const t=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:r,views:c,comments:b,downloads:S})=>`<li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${o}"
              alt="${e}"
              width="360"
            />
          </a>
          <ul class="img-list">
  <li class="img-info">
   <p class="img-text">Likes: <br><span>${r}</span></p>
   <p class="img-text">Views: <br><span>${c}</span></p>
   <p class="img-text">Comment: <br><span>${b}</span></p>
   <p class="img-text">Downloads: <br><span>${S}</span></p>
   </li>
   </ul>
        </li>`).join("");m.insertAdjacentHTML("beforeend",t),E.refresh()}
//# sourceMappingURL=commonHelpers.js.map
