require('dotenv').config()
const mainDatabase = require('../main.sequelize')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, API_KEY, VERSION="1.0.1"} = process.env

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            next()
        })
    } catch {
        res.sendStatus(500)
    }
}

const apiKeyCheck = (req, res, next) => {
	if(req.query.apiKey == API_KEY)
		next()
	else {
		res.sendStatus(401)
	}
}

/**
 * for create and create withArray
 * check if question does not already exists
 */

const create = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        if(true){ //check duplicate
            const newUser = await User.create({
                "email": req.body.email,
                "password": hashedPassword,
                "username": req.body.username,
                "admin": req.body.admin
            })
            res.status(201).json(newUser)
        } else {
            res.sendStatus(401).send('Duplicate')
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

const login = async (req, res) => {
    try {
        var user = null
        if(req.body.username) {
            user = await User.findAll({
            where: {username:req.body.username}
            })
        }
        else if(req.body.email) {
            user = await User.findAll({
            where: {email:req.body.email}
            })
        }
        else {
            res.sendStatus(404).send('Cannot find user')
        }
        if( await bcrypt.compare(req.body.password, user[0].password)){
            const accessToken = jwt.sign(user[0].username, ACCESS_TOKEN_SECRET)
            res.status(200).send(accessToken)
        } else {
            res.status(403).send('Not Allowed')
        }
    } catch {
        res.sendStatus(403)
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        res.status(200).json(user)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByUsername = async (req, res) => {
    try {
        const user = await ( await User.findAll({
            where: {username:req.query.username}
        })).map(user => {
            delete user.password
            return user
        })
        res.status(200).json(user)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByEmail = async (req, res) => {
    try {
        const user = await ( await User.findAll({
            where: {email:req.query.email}
        })).map(user => {
            delete user.password
            return user
        })
        res.status(200).json(user)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getAll = async (req, res) => {
    try {
        const users = await ( await User.findAll()).map(user => {
            delete user.password
            return user
        })
        res.status(200).json(users)
    } catch (error) {
        res.sendStatus(404)
    }
}

const deleteById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
	    await user.destroy()
        res.status(200).send('Deleted')
    } catch (error) {
        res.sendStatus(400)
    }
}

const getCount = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).send(""+users.length)
    } catch (error) {
        res.sendStatus(500)
    }
}

/*
* TODO: check if username is not taken
*/
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { id: req.query.id }
        })
	    res.status(200).send(req.body)
    } catch {
	    res.sendStatus(404)
    }
}

/*
* TODO: check if username is not taken
*/
const updateUsername = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { id: req.query.id }
        })
	    res.status(200).send("New username set to: " + user.username)
    } catch {
	    res.sendStatus(404)
    }
}

const updatePassword = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { id: req.query.id }
        })
	    res.status(200).send('Password Updated')
    } catch {
	    res.sendStatus(404)
    }
}

const updateEmail = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { id: req.query.id }
        })
	    res.status(200).send('Email Updated')
    } catch {
	    res.sendStatus(404)
    }
}

const changeAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { id: req.query.id}
        })
	res.status(200).send('Status updated')
    } catch {
        res.sendStatus(404)
    }
}

const ping = (req, res) => {
    try {
        res.status(200).json({
            "version": VERSION
        })
    } catch {
	    res.sendStatus(500)
    }
}

/*
* TODO: Replace with score
*/
const score = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {username:req.user}
        })
        res.status(200).json(user[0].score)
    } catch {
	    res.sendStatus(500)
    }
}

module.exports = {
    authenticateToken,
    apiKeyCheck,
    create,
    login,
    changeAdmin,
    getByUsername,
    getByEmail,
    getById,
    getAll,
    getCount,
    updateUsername,
    updatePassword,
    updateEmail,
    updateUser,
    deleteById,
    ping,
    score
}
