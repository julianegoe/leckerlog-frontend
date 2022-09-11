import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { setCacheNameDetails } from 'workbox-core';
import { addRoute, PrecacheRouteOptions } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';

declare let self: any

addRoute(self.__WB_MANIFEST);

setCacheNameDetails({ prefix: 'leckerlog' });

// Cache api Calls
const baseURL = `${import.meta.env.VITE_BASE_URL}/`;
const apiRouteRegEx = baseURL.replace('\\.', '\\\\.');

registerRoute(
  new RegExp(apiRouteRegEx.concat('cuisines*')),
  new StaleWhileRevalidate({ cacheName: 'cuisines' }),
);
registerRoute(
  new RegExp(apiRouteRegEx.concat('leckerlog*')),
  new StaleWhileRevalidate({ cacheName: 'leckerlog' }),
);

// Cache portal icons
registerRoute(
  // eslint-disable-next-line prefer-regex-literals
  new RegExp('https://www\\.google\\.com/s2/favicons*'),
  new CacheFirst({
    cacheName: 'favicons',
    plugins: [
      new ExpirationPlugin({
        // cache for 10 min
        maxAgeSeconds: 10 * 60,
      }),
    ],
  }),
);
