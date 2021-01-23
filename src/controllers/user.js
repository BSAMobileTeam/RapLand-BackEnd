require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {ACCESS_TOKEN_SECRET} = process.env

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err) return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            if(user !== null){
                req.user = user.username
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        if(token == null) 
            return res.sendStatus(401)
    
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, id) => {
            if(err)
                return res.sendStatus(403)
            req.id = id
            const user = await User.findByPk(req.id)
            if(user == null){
                res.sendStatus(404)
            } else if(user.admin){
                req.user = user.username
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } catch (error) {
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
    } catch (error) {
        res.sendStatus(403)
    }
}

const logout = async (req, res) => {
    try {
        //somehow logout user ?
        res.sendStatus(204)
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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

// Password should be sent encryoted by frontend
const create = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        if((await User.findOne({ where: { email: req.body.email }})) !== null){
            res.status(403).send("Email address already used")
        }
        else if((await User.findOne({ where: { username: req.body.username }})) !== null){
            res.status(403).send("Username already used")
        }
        else{
            const newUser = await User.create({
                "email": req.body.email,
                "password": hashedPassword,
                "username": req.body.username,
                "admin": false
            })
            const accessToken = generateAccessToken(newUser.id)
            res.status(201).json(accessToken)
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

/*
*TMP method, sets Admin to true
*TODO: Delete method when dev is over / switching to prod
*/
const createTmp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        if((await User.findOne({ where: { email: req.body.email }})) !== null){
            res.status(403).send("Email address already used")
        }
        else if((await User.findOne({ where: { username: req.body.username }})) !== null){
            res.status(403).send("Username already used")
        }
        else{
            const newUser = await User.create({
                "email": req.body.email,
                "password": hashedPassword,
                "username": req.body.username,
                "admin": false
            })
            const accessToken = generateAccessToken(newUser.id)
            res.status(201).json(accessToken)
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
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(users)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.query.id },
            attributes: { exclude: ['password'] }
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.query.username },
            attributes: { exclude: ['password'] }
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.query.email },
            attributes: { exclude: ['password'] }
        })
        const admin = await User.findByPk(req.id)
        if(admin.admin){
            res.status(200).json(user)
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(404)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.id },
            attributes: { exclude: ['password'] }
        })
        res.status(200).json(user)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = {
    authenticateAdmin,
    authenticateToken,
    addScore,
    changeAdmin,
    count,
    create,
    createTmp,
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
