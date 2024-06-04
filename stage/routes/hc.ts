import { ServerRoute } from '@hapi/hapi';
import Package from '../../package.json';

const { name, version, description } = Package;
const healthCheckRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/hc',
    options: {
      id: 'hc',
      description: 'Health Check',
      auth: false,
      handler: () => ({
        success: true,
        name,
        version,
        description,
      }),
    },
  },
];
export default healthCheckRoutes;
