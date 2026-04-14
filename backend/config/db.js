const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1', // Host Docker
  database: 'testdb',
  password: '1234',
  port: 5433,
});

module.exports = pool;