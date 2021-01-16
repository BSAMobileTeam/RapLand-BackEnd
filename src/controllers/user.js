require('dotenv').config()
const mainDatabase = require('../main.sequelize')
const User = require('../models/user')

const {API_KEY, VERSION="1.0.1"} = process.env

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
        
        if(true){ //check duplicate
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } else {
            res.sendStatus(401).send('Duplicate')
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

const getById = async (req, res) => {
    try {
        const user = await ( await User.findByPk(req.query.id)).map(user => {
            delete user.password
            return user
        })
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

module.exports = {
    apiKeyCheck,
    create,
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
    ping
}
