const cacheName = 'leckerlog';

self.addEventListener('fetch', (event: Event) => {
    console.log('sw: ', event)
 });