const { body, query, header } = require('express-validator');

const checkGetUser = [
    header('authorization').exists()
]

const checkAddScoreById = [
    header('authorization').exists(),
    query('id').isUUID(4).notEmpty(),
    query('score').isNumeric({min: 1}), //max score ?
]

const checkAddScore = [
    header('authorization').exists(),
    query('score').isNumeric({min: 1}), //max score ?
]

const checkRegister = [
    query('apiKey').isString().notEmpty().optional(),
    body('email').isEmail(),
    body('password').isString().isLength({min: 4, max: 255}),
    body('username').isString().isLength({min: 4, max: 20}),
    body('admin').isBoolean().optional(),
    body('score').not().exists(),
    body('bought').not().exists()
]

const checkLogin = [
    body('username').isString({min: 4, max: 20}).notEmpty().optional(),
    body('email').isEmail().optional(),
    body('password').isString({min: 4, max: 255}).notEmpty()
]

const checkDeleteById = [
    header('authorization').exists(),
    query('id').isUUID(4).notEmpty()
]

const checkGetByUsername = [
    header('authorization').exists(),
    query('username').isString({min: 4, max: 20}).notEmpty()
]

const checkGetByEmail = [
    header('authorization').exists(),
    query('email').isEmail()
]

const checkGetById = [
    header('authorization').exists(),
    query('id').isUUID(4).notEmpty()
]

const checkUpdateUser = [
    header('authorization').exists(),
    body('email').isEmail().optional(),
    body('password').isString().isLength({min: 4, max: 255}).optional(),
    body('username').isString().isLength({min: 4, max: 20}).optional(),
    body('admin').isBoolean().optional(),
    body('score').isNumeric().optional(),
]

const checkUpdateUserById = [
    header('authorization').exists(),
    query('id').isString().notEmpty(),
    body('email').isEmail().optional(),
    body('password').isString().isLength({min: 4, max: 255}).optional(),
    body('username').isString().isLength({min: 4, max: 20}).optional(),
    body('admin').isBoolean().optional(),
    body('score').isNumeric().optional(),
]

const checkSetAdmin = [
    header('authorization').exists(),
    query('id').isUUID(4).notEmpty(),
    query('isAdmin').isBoolean().notEmpty()
]

const checkGetAll = [
    header('authorization').exists()
]

const checkCount = [
    header('authorization').exists()
]

module.exports = {
    checkGetUser,
    checkAddScore,
    checkAddScoreById,
    checkRegister,
    checkLogin,
    checkDeleteById,
    checkGetByUsername,
    checkGetByEmail,
    checkGetById,
    checkUpdateUser,
    checkUpdateUserById,
    checkSetAdmin,
    checkGetAll,
    checkCount
}