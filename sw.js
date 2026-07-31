const CACHE_NAME='pozorantsi-song-base-secure-rc4';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(response=>{
   if(response&&response.ok&&new URL(e.request.url).origin===self.location.origin){
     const copy=response.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)).catch(()=>{});
   }
   return response;
 }).catch(()=>caches.match(e.request)));
});
