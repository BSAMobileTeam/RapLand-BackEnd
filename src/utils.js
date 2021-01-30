const {
    VERIFY_EMAIL_API_KEY,
    VERIFY_EMAIL_ENDPOINT
} = process.env

const axios = require('axios')
const logger = require('./logger')

const emailStatusEnum = Object.freeze({
    VALID: 1,
    INVALID: 0,
    UNKNOWN: -1
})

const getEmailStatus = async email => {
    try {
        const response = await axios.get(`${VERIFY_EMAIL_ENDPOINT}/${VERIFY_EMAIL_API_KEY}/verify/${email}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        return response.data.status
    } catch (error) {
        logger.fatal(error)
        return null
    }
}

module.exports = {
    emailStatusEnum,
    getEmailStatus
}