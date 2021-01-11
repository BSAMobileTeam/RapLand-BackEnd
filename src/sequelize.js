const { Sequelize } = require('sequelize')

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
})

// (async () => await sequelize.sync())()


module.exports = sequelize
