const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',    // lub IP kontenera, np. '172.17.0.2'
    port: 5432,           // zamień na faktyczny port
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

module.exports = pool;
