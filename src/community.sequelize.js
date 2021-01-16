// External modules
const { Sequelize } = require('sequelize')

// Creates Sequelize instance
const communityDatabase = new Sequelize('community', 'community', 'community', {
  host: 'localhost',
  port: 5433,
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
(async () => await communityDatabase.sync())()

// Exports items
module.exports = communityDatabase
