var C='camilo-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','./index.html'])}))});
self.addEventListener('activate',function(e){e.waitUntil(clients.claim())});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(function(r){var x=r.clone();caches.open(C).then(function(c){c.put(e.request,x)});return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('./index.html')})}))});
