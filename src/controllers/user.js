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

const updateUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        const admin = await User.findByPk(req.id)
        if(admin.admin){
        await user.update(req.body, {
                where: { id: req.query.id }
            })
            res.status(200).send(req.body)
        }
        res.sendStatus(403)
    } catch {
        res.sendStatus(404)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        await user.update(req.body, {
            where: { id: req.id }
        })
        res.status(200).send(req.body)
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

const changeAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            await user.update(req.body, {
                where: { id: req.query.id}
            })
            res.status(200).send('Status updated')
        }
        res.sendStatus(403)
    } catch {
        res.sendStatus(404)
    }
}

const count = async (req, res) => {
    try {
        const users = await User.findAll()
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).send(""+users.length)
        }
        res.sendStatus(403)
    } catch (error) {
        res.sendStatus(500)
    }
}

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
            const accessToken = generateAccessToken(newUser.id)
            res.status(201).json(accessToken)
        } else {
            res.sendStatus(401).send('Duplicate')
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

const deleteById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            await user.destroy()
            res.status(200).send('Deleted')
        }
        res.sendStatus(403)
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
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(users)
        }
        res.sendStatus(403)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        }
        res.sendStatus(403)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByUsername = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {username:req.query.username}
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        }
        res.sendStatus(403)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByEmail = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {email:req.query.email}
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        }
        res.sendStatus(403)
    } catch (error) {
        res.sendStatus(404)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.id)
        res.status(200).json(user)
    } catch {
        res.sendStatus(500)
    }
}

module.exports = {
    authenticateToken,
    addScore,
    changeAdmin,
    count,
    create,
    deleteById,
    getAll,
    getByEmail,
    getById,
    getByUsername,
    getUser,
    login,
    logout,
    updateUser,
    updateUserById
}
