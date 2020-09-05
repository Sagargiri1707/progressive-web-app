
const cachename = "pwa"
const dyncache="dyn"
const assets = [
    '/',
    '/index.html',
    '/js/App.js',
    '/js/script.js',
    '/js/materialize.js',
    '/css/materialize.min.css',
    '/css/style.css',
    '/css/font-awesome/css/font-awesome.css',
    '/image/as.jpg',
    '/pages/fallback.html'

]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache
                    .delete(keys[0])
                    .then(limitCacheSize(name, size))
            }
                
        })
    })
}
//assssssssssssssssssssssss///as
//ss
self.addEventListener('install', evt => {
    console.log('insatll');
    
    evt.waitUntil(
    caches
        .open(cachename)
        .then(res => {
            console.log('caching');
            
        res.addAll(assets)
    }))
})

self.addEventListener('activate', act => {
    evt.waitUntil(
        caches.keys().then(res => {
            return Promise.all(
            res
                .filter(a => a !== cachename && a!==dyncache)
            
                .map(key => {
                caches.delete(key) 
            })
            )
        })
    )
})


self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches
            .match(evt.request)
            .then(res => {
                return res || fetch(evt.request).then(async fetchRes => {
                    const cache = await caches.open(dyncache);
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dyncache,15)
                    return fetchRes;
                })
            }).catch(() => {
                if(evt.request.url.indexOf('.html')>-1)//Do same for .png and many more fallback images
                   return caches.match('/pages/fallback.html')
            })
    )
})

 