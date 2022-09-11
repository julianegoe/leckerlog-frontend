import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { setCacheNameDetails } from 'workbox-core';
import {ExpirationPlugin} from 'workbox-expiration';
import { addRoute } from 'workbox-precaching';

declare let self: any

addRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => {
  console.log("Service worker installed");
});
self.addEventListener("activate", () => {
  console.log("Service worker activated");
});

registerRoute(
    new RegExp(`${import.meta.env.VITE_BASE_API_URL}/cuisines`),
    new NetworkFirst({
        cacheName: 'cuisines',
        plugins: [
            new ExpirationPlugin({
              // Only cache requests for a week
              maxAgeSeconds: 5 * 60,
              // Only cache 10 requests.
              maxEntries: 2,
            }),
          ],
    })
);

registerRoute(
    new RegExp(`${import.meta.env.VITE_BASE_API_URL}/leckerlog`),
    new NetworkFirst({
        cacheName: 'cuisines',
        plugins: [
            new ExpirationPlugin({
              // Only cache requests for a week
              maxAgeSeconds: 1 * 60,
              // Only cache 10 requests.
              maxEntries: 2,
            }),
          ],
    })
);