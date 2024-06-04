/* eslint-disable import/no-import-module-exports */
import { plugin as Schmervice } from '@hapipal/schmervice';
import Schwifty from '@hapipal/schwifty';
import { knexSnakeCaseMappers } from 'objection';
import { mySql } from '@config';

const { mySqlMasterHost, mySqlMasterPort, mySqlMasterUser, mySqlMasterPassword, mySqlMasterDatabase,
  mySqlMasterConnectionPoolLimit, mySqlMasterConnectionPoolMin, mySqlMasterConnectionPoolMax
} = mySql;

module.exports = [
  {
    plugin: Schmervice,
  },
  {
    plugin: Schwifty,
    options: {
      knex: {
        client: 'mysql2',
        connection: {
          host: mySqlMasterHost,
          port: mySqlMasterPort,
          user: mySqlMasterUser,
          password: mySqlMasterPassword,
          database: mySqlMasterDatabase,
          waitForConnections: true,
          connectionLimit: parseInt(mySqlMasterConnectionPoolLimit, 10) || 80,
          queueLimit: 0,
          typeCast(field: any, next: any) {
            if (field.type === 'TINY' && field.length === 1) {
              return field.string() === '1';
            }
            if (field.type === 'NEWDECIMAL') {
              return parseFloat(field.string());
            }
            return next();
          },
          dateStrings: false,
          timezone: '+00:00',
        },
        pool: {
          min: parseInt(mySqlMasterConnectionPoolMin, 10) || 50,
          max: parseInt(mySqlMasterConnectionPoolMax, 10) || 185,
        },
        ...knexSnakeCaseMappers(),
      },
    },
  },
];
