import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { setCacheNameDetails } from 'workbox-core';
import { addRoute } from 'workbox-precaching';

declare let self: any

addRoute(self.__WB_MANIFEST);

const baseURL = `${import.meta.env.VITE_BASE_API_URL}/`;
const apiRouteRegEx = baseURL.replace('\\.', '\\\\.');


setCacheNameDetails({ prefix: 'leckerlog' });

registerRoute(
    new RegExp(apiRouteRegEx.concat('cuisines*')),
    new NetworkFirst()
);

registerRoute(
    new RegExp(apiRouteRegEx.concat('leckerlog*')),
    new NetworkFirst()
);