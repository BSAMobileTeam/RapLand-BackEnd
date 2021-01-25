const { body, query, header } = require('express-validator');

const checkGetUser = [
    header('authorization').exists()
]

const checkAddScore = [
    header('authorization').exists(),
    body('score').isNumeric(), //max score ?
]

const checkRegister = [
    query('apiKey').isString().notEmpty().optional(),
    body('email').isEmail(),
    body('password').isString().isLength({min: 4}),
    body('username').isString().isLength({min: 4, max: 20}),
    body('admin').isBoolean().optional(),
    body('score').isNumeric().optional(),
]

const checkLogin = [
    body('username').isString().notEmpty().optional(),
    body('email').isEmail().optional(),
    body('password').isString().notEmpty()
]

const checkDeleteById = [
    header('authorization').exists(),
    query('id').isString().notEmpty()
]

const checkGetByUsername = [
    header('authorization').exists(),
    query('username').isString().notEmpty()
]

const checkGetByEmail = [
    header('authorization').exists(),
    query('email').isString().notEmpty()
]

const checkGetById = [
    header('authorization').exists(),
    query('id').isString().notEmpty()
]

const checkUpdateUser = [
    header('authorization').exists(),
    body('email').isEmail().optional(),
    body('password').isString().isLength({min: 4}).optional(),
    body('username').isString().isLength({min: 4, max: 20}).optional(),
    body('admin').isBoolean().optional(),
    body('score').isNumeric().optional(),
]

const checkUpdateUserById = [
    header('authorization').exists(),
    query('id').isString().notEmpty(),
    body('email').isEmail().optional(),
    body('password').isString().isLength({min: 4}).optional(),
    body('username').isString().isLength({min: 4, max: 20}).optional(),
    body('admin').isBoolean().optional(),
    body('score').isNumeric().optional(),
]

const checkChangeAdmin = [
    header('authorization').exists(),
    query('id').isString().notEmpty(),
    body('admin').isBoolean().notEmpty()
]

const checkCount = [
    header('authorization').exists()
]

module.exports = {
    checkGetUser,
    checkAddScore,
    checkRegister,
    checkLogin,
    checkDeleteById,
    checkGetByUsername,
    checkGetByEmail,
    checkGetById,
    checkUpdateUser,
    checkUpdateUserById,
    checkChangeAdmin,
    checkCount
}