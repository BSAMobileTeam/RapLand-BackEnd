require('dotenv').config()
const log4js = require('log4js')

const logger = log4js.getLogger()

logger.level = "fatal"

if (
        process.env["SEQUELIZE_LOG_LEVEL"] === undefined ||
        process.env["SEQUELIZE_LOG_LEVEL"] === "" ||
        process.env["SEQUELIZE_LOG_LEVEL"] !== "trace" &&
        process.env["SEQUELIZE_LOG_LEVEL"] !== "debug" &&
        process.env["SEQUELIZE_LOG_LEVEL"] !== "info" &&
        process.env["SEQUELIZE_LOG_LEVEL"] !== "warn" &&
        process.env["SEQUELIZE_LOG_LEVEL"] !== "error" &&
        process.env["SEQUELIZE_LOG_LEVEL"] !== "fatal"
    ) {
        logger.fatal("There is no variable \"SEQUELIZE_LOG_LEVEL\" in .env (it must be \"trace\", \"debug\", \"info\", \"warn\", \"error\" or \"fatal\") (cf README.md)")
        logger.fatal("Exiting program with exit code 1.")
        process.exit(1)
}

logger.level = process.env["SEQUELIZE_LOG_LEVEL"]

module.exports = logger
