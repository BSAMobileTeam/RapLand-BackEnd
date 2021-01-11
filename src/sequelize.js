// External modules
const { Sequelize } = require('sequelize')

// Creates Sequelize instance
const sequelize = new Sequelize('rapjeu', 'rapjeu', 'rapjeu', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 5,
    acquire: 60000,
    idle: 10000,
    evict: 1000
  }
});

// Synchronizes database schema
(async () => await sequelize.sync())()

// Exports items
module.exports = sequelize
