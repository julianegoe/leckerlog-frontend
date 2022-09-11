import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { setCacheNameDetails } from 'workbox-core';
import {ExpirationPlugin} from 'workbox-expiration';
import { addRoute } from 'workbox-precaching';

declare let self: any

addRoute(self.__WB_MANIFEST);

const baseURL = `${import.meta.env.VITE_BASE_API_URL}/`;
const apiRouteRegEx = baseURL.replace('\\.', '\\\\.');


setCacheNameDetails({ prefix: 'leckerlog' });

registerRoute(
    new RegExp(apiRouteRegEx.concat('cuisines*')),
    new NetworkFirst({
        cacheName: 'cuisines',
        plugins: [
            new ExpirationPlugin({
              // Only cache requests for a week
              maxAgeSeconds: 2 * 60,
              // Only cache 10 requests.
              maxEntries: 1,
            }),
          ],
    })
);

registerRoute(
    new RegExp(apiRouteRegEx.concat('leckerlog*')),
    new NetworkFirst()
);