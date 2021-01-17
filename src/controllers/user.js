require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, VERSION="1.0.1"} = process.env

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err) return res.sendStatus(403)
            req.user = user
            const userDB = await User.findAll({
                where: {username:req.user}
            })
            req.id = userDB[0].id
            next()
        })
    } catch {
        res.sendStatus(500)
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

const logout = async (req, res) => {
    try {

    } catch {
        res.sendStatus(403)
    }
}

const updateUsername = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update(req.body, {
            where: { username: req.query.id }
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

const username = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {username:req.user}
        })
        res.status(200).json(user[0].username)
    } catch {
	    res.sendStatus(500)
    }
}

const email = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {username:req.user}
        })
        res.status(200).json(user[0].email)
    } catch {
	    res.sendStatus(500)
    }
}

const admin = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {username:req.user}
        })
        res.status(200).json(user[0].admin)
    } catch {
	    res.sendStatus(500)
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
    authenticateToken,
    login,
    logout,
    updateUsername,
    updatePassword,
    updateEmail,
    username,
    score,
    email,
    admin,
    ping
}
