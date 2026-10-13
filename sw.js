const C="tileboard-v3",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;
 if(q.mode==="navigate"){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put("index.html",c));return r}).catch(()=>caches.match("index.html")));return}
 if(q.url.includes("arasaac.org")){e.respondWith(caches.match(q).then(h=>h||fetch(q).then(r=>{if(r.ok||r.type==="opaque"){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r})));return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q)))});
