// External modules
const { Sequelize } = require('sequelize')

// Creates Sequelize instance
const mainDatabase = new Sequelize('rapjeu', 'rapjeu', 'rapjeu', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
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
(async () => await mainDatabase.sync())()

// Exports items
module.exports = mainDatabase
