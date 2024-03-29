require('dotenv').config()

const logger = require('./logger')

const checkEnvVariables = () => {
    const keys = Object.keys(process.env)
    let error = false

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
        logger.error("There is no variable \"LOG_LEVEL\" in .env (it must be \"off\", \"trace\", \"debug\", \"info\", \"warn\", \"error\" or \"fatal\")")
        error = true
    }
    if (keys.includes('API_KEY') === false || process.env["API_KEY"] === "") {
        logger.error("There is no variable \"API_KEY\" in .env (it must be a non emtpy string)")
        error = true
    }
    if (keys.includes('ACCESS_TOKEN_SECRET') === false || process.env["ACCESS_TOKEN_SECRET"] === "") {
        logger.error("There is no variable \"ACCESS_TOKEN_SECRET\" in .env (it must be a non emtpy string)")
        error = true
    }
    if (keys.includes('DEFAULT_MIXED_ARRAY_LENGTH') === false || process.env["DEFAULT_MIXED_ARRAY_LENGTH"] === "") {
        logger.error("There is no variable \"DEFAULT_MIXED_ARRAY_LENGTH\" in .env (it must be a strictly positive number)")
        error = true
    }
    if (keys.includes('GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS') === false || process.env["GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS"] === "") {
        logger.error("There is no variable \"GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS\" in .env (it must be a strictly positive number)")
        error = true
    }
    if (keys.includes('VERIFY_EMAIL_API_KEY') === false || process.env["VERIFY_EMAIL_API_KEY"] === "") {
        logger.error("There is no variable \"VERIFY_EMAIL_API_KEY\" in .env (it must be a non empty string)")
        error = true
    }
    if (keys.includes('VERIFY_EMAIL_ENDPOINT') === false || process.env["VERIFY_EMAIL_ENDPOINT"] === "") {
        logger.error("There is no variable \"VERIFY_EMAIL_ENDPOINT\" in .env (it must be a non empty string)")
        error = true
    }
    if (error === true) {
        logger.fatal("Error in .env (cf README.md) file, exiting program with exit code 1.")
        process.exit(1)
    }
}

module.exports = {
    checkEnvVariables
}