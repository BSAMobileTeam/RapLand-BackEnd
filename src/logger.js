require('dotenv').config()
const log4js = require('log4js')

const logger = log4js.getLogger()

logger.level = "fatal"

if (
        process.env["LOG_LEVEL"] === undefined ||
        process.env["LOG_LEVEL"] === "" ||
        process.env["LOG_LEVEL"] !== "trace" &&
        process.env["LOG_LEVEL"] !== "debug" &&
        process.env["LOG_LEVEL"] !== "info" &&
        process.env["LOG_LEVEL"] !== "warn" &&
        process.env["LOG_LEVEL"] !== "error" &&
        process.env["LOG_LEVEL"] !== "fatal"
    ) {
        logger.fatal("There is no variable \"LOG_LEVEL\" in .env (it must be \"trace\", \"debug\", \"info\", \"warn\", \"error\" or \"fatal\") (cf README.md)")
        logger.fatal("Exiting program with exit code 1.")
        process.exit(1)
}

logger.level = process.env["LOG_LEVEL"]

module.exports = logger
