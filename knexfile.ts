import 'dotenv/config';
import { mySql } from '@config';

export const config = { transaction: true };

const { mySqlMasterHost, mySqlMasterPort, mySqlMasterUser, mySqlMasterPassword, mySqlMasterDatabase } = mySql;

export default {
  client: 'mysql2',
  connection: {
    host: mySqlMasterHost,
    port: mySqlMasterPort,
    user: mySqlMasterUser,
    password: mySqlMasterPassword,
    database: mySqlMasterDatabase,
  },
  migrateOnStart: true,
  migrations: {
    tableName: 'migrations',
  },
};
