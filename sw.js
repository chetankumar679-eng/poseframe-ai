const CACHE='poseframe-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest']))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
    const copy=r.clone(); if(new URL(e.request.url).origin===location.origin){caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return r;
  }).catch(()=>cached)));
});
