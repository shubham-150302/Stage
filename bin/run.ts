import Minimist, { ParsedArgs } from 'minimist';
import ServerDeployment from '../server';

// Parse cli args
const argv: ParsedArgs = Minimist(process.argv.slice(2));

const runServer = async (): Promise<void> => {
  ServerDeployment({ start: true });
};

if (argv.server) {
  runServer();
}
