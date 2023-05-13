const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './data/premios.db'
});

module.exports = sequelize;