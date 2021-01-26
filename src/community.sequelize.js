// External modules
const { Sequelize } = require('sequelize')
const logger = require('./logger')

// Creates Sequelize instance
const communityDatabase = new Sequelize('community', 'community', 'community', {
  host: 'localhost',
  port: 5434,
  dialect: 'postgres',
  logging: msg => logger.trace(msg),
  pool: {
    min: 0,
    max: 5,
    acquire: 60000,
    idle: 10000,
    evict: 1000
  },
  define: {
    timestamps: false
  }
});

// Synchronizes database schema
(async () => await communityDatabase.sync())()

// Exports items
module.exports = communityDatabase
