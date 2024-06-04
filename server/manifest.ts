import { Manifest } from '@hapi/glue';
import { env } from '@utilities';
import ServicePlugins from '../stage'; // Change the name of the folder for new projects with its name

const ServerManifest: Manifest = {
  server: {
    host: env('SERVER_HOST', '0.0.0.0'),
    port: env('PORT', '3000'),
    routes: {
      cors: {
        origin: env('ALLOWED_ORIGINS', '*').split(','),
        headers: [
          'locale',
        ],
      },
    },
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
    state: {
      strictHeader: false,
    },
  },
  register: {
    plugins: [
      {
        plugin: ServicePlugins,
        routes: {
          prefix: '/api',
        },
      },
    ],
  },
};

export default ServerManifest;
