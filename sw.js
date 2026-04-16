// Este é o Service Worker básico para permitir a instalação do PWA
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado!');
});

self.addEventListener('fetch', (event) => {
    // Necessário para o PWA ser considerado instalável
    event.respondWith(fetch(event.request));
});