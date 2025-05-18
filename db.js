const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',    // lub IP kontenera, np. '172.17.0.2'
    port: 5432,           // zamień na faktyczny port
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

const Users = sequelize.define('Users', {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
})
const QueryResult = sequelize.define('QueryResult', {
    username: { type: DataTypes.STRING, allowNull: false },
    responseData: { type: DataTypes.JSONB, allowNull: false }
}, {});

sequelize.sync();

module.exports = { sequelize, QueryResult, Users, pool };