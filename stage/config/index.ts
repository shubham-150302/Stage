export const log = {
  level: process.env.LOG_LEVEL || 'error',
};

export const serviceName = 'stage';

export const mySql = {
  mySqlMasterHost: 'mysql-1ed2eb5-shubham-ott.e.aivencloud.com',
  mySqlMasterPort: '15576',
  mySqlMasterUser: 'avnadmin',
  mySqlMasterPassword: 'AVNS_IhKAFu4MzSTa_ScGQhh',
  mySqlMasterDatabase: 'sk_stage_ott_db_staging',
  mySqlMasterConnectionPoolMin: '50',
  mySqlMasterConnectionPoolMax: '185',
  mySqlMasterConnectionPoolLimit: '80',
}
