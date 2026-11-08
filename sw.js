var C='camilo-v2';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','./index.html'])}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return clients.claim()}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
var fb=function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('./index.html')})};
var net=fetch(e.request).then(function(r){var x=r.clone();caches.open(C).then(function(c){c.put(e.request,x)});return r});
e.respondWith(Promise.race([net,new Promise(function(_,j){setTimeout(j,3000)})]).catch(fb))});
