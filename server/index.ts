/* eslint-disable no-console */
import 'dd-trace/init';
import { Server } from '@hapi/hapi';
import { compose } from '@hapi/glue';
import { createManager } from 'exiting';
import 'dotenv/config';

import Manifest from './manifest';

interface DeploymentOptions {
  start: boolean;
}

const deployment = async ({ start = true }: DeploymentOptions): Promise<Server> => {
  const server: Server = await compose(Manifest, { relativeTo: __dirname });

  process
    .on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at Promise', reason, p);
    })
    .on('uncaughtException', (err) => {
      console.error('Uncaught Exception thrown', err);
      process.exit(1);
    });

  if (start) {
    await createManager(server).start();
    console.info(`Server started at ${server.info.uri}`);
    return server;
  }

  await server.initialize();

  return server;
};

export default deployment;
