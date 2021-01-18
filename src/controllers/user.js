require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {ACCESS_TOKEN_SECRET, VERSION="1.0.1"} = process.env

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err) return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            req.user = user.username
            next()
        })
    } catch {
        res.sendStatus(500)
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET)
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
            const accessToken = generateAccessToken(user[0].id)
            res.status(200).json({ accessToken: accessToken })
        } else {
            res.status(403).send('Not Allowed')
        }
    } catch {
        res.sendStatus(403)
    }
}

const logout = async (req, res) => {
    try {
        //somehow logout user ?
        res.sendStatus(204)
    } catch {
        res.sendStatus(403)
    }
}

const updateUsername = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        await user.update(req.body, {
            where: { username: req.id }
        })
	    res.status(200).send("New username set to: " + user.username)
    } catch {
	    res.sendStatus(404)
    }
}

const updatePassword = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        await user.update(req.body, {
            where: { id: req.id }
        })
	    res.status(200).send('Password Updated')
    } catch {
	    res.sendStatus(404)
    }
}

const updateEmail = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        await user.update(req.body, {
            where: { id: req.id }
        })
	    res.status(200).send('Email Updated')
    } catch {
	    res.sendStatus(404)
    }
}

const addScore = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        const score = user.score
        await user.update({ "score": req.body.score + score }, {
            where: { id: req.id }
        })
        res.status(200).json(user.score)
    } catch {
	    res.sendStatus(500)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await ( await User.findByPk(req.id)).map( user => {
            delete user.password
            return user
        })
        res.status(200).json(user.admin)
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
    addScore,
    getUser,
    ping
}
