const CACHE = 'lyqx-v14';

const HERO_KEY = 'rPXaLrnrfr0ykLplC0Vkam5Q';

const INTERCEPTS = new Map([
  ['m4dKAuxSoRsJwbzFiB73wjOWng', '/images/bg-background-opt.svg'],
  ['si0GZfTzwBd4HWIcOTrDrmXuLNw', '/images/opt/si0GZfTzw.webp'],
  ['6UrZxiCEtV2DOhRiM0Pbph77Ys',  '/images/opt/6UrZxiCEt.webp'],
  ['oOM75ia5jU1PdQOpPJhM0LSxQ',   '/images/opt/oOM75ia5j.webp'],
  ['ng7zIvz33ewQKBMU7PUQ5mvMB6s', '/images/opt/ng7zIvz33.webp'],
  ['2HWRK3vlKzEXlXl3qi5KjhWC7k',  '/images/opt/2HWRK3vlK.webp'],
  ['yKqsOFAE2iZ1guljrzxpcJItGAE', '/images/opt/yKqsOFAE2.webp'],
  ['fqpLjkqKaY2JRJXgdrGESH6XV0s', '/images/opt/fqpLjkqKa.webp'],
  ['3quFMIv6ZHa5UcOs63diPc93Bg',  '/images/opt/3quFMIv6Z.webp'],
  ['nHMeo9EjOy5vTBipDZtCb1D8wE',  '/images/opt/nHMeo9EjO.webp'],
  ['ROzj0uF6yLJ7kKxybKTUG6bUHrU', '/images/opt/ROzj0uF6y.webp'],
  ['MSFjBSoFeAVqtSb7n9wg3WndKn0', '/images/opt/MSFjBSoFe.webp'],
  ['YlYIbfFEujexwgWABDzpsRlY',    '/images/opt/YlYIbfFEu.webp'],
  ['GOSaevppvAyPFYeZhRh884HnECE', '/images/opt/GOSaevppv.webp'],
  ['uDDaBqyNgExBJhcYGlDGUzBDIg',  '/images/opt/uDDaBqyNg.webp'],
  ['94IlnmCd4uUSOaY5GqQG20bp4dk', '/images/opt/94IlnmCd4.webp'],
  ['V88rCCPT8qH2OVVQXGoWpO3ujI',  '/images/opt/V88rCCPT8.webp'],
  ['Zhtoy1e5KI9uSC0OSyqsqUoWgc',  '/images/opt/Zhtoy1e5K.webp'],
  ['sw5SJD6NUyKMWIDw9NjIfJeC9I',  '/images/opt/sw5SJD6NU.webp'],
]);

const PRECACHE = [
  '/images/transparent.webp',
  '/images/bg-background-opt.svg',
];

function serveCached(event, localPath) {
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(localPath).then(cached => cached || fetch(localPath))
    )
  );
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { url } = event.request;

  if (url.includes(HERO_KEY)) {
    let localPath = '/images/bg-hero-1100.webp';
    if (url.includes('scale-down-to=1024'))      localPath = '/images/bg-hero-480.webp';
    else if (url.includes('scale-down-to=2048')) localPath = '/images/bg-hero-768.webp';
    serveCached(event, localPath);
    return;
  }

  for (const [key, localPath] of INTERCEPTS) {
    if (url.includes(key)) {
      serveCached(event, localPath);
      return;
    }
  }
});
