import { compose } from '@hapipal/haute-couture';
import { Server, Plugin } from '@hapi/hapi';
import { serviceName } from '@config';

const Composer: Plugin<unknown> = {
  name: serviceName || 'stage',
  register: async (server: Server, options: unknown): Promise<void> => {
    // Custom plugin code can go here
    await compose<unknown>(server, options);
  },
};

export default Composer;
