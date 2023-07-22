'use strict'; // what does this mean?
const Knex = require('knex');

const createUnixSocketPool = async config => {
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.INSTANCE_UNIX_SOCKET,
    },
    // ... Specify additional properties here.
    ...config,
  });
};

// [END cloud_sql_postgres_knex_connect_unix]
module.exports = createUnixSocketPool;