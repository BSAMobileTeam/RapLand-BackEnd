require('dotenv').config()
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {
    API_KEY,
    ACCESS_TOKEN_SECRET,
    VERIFY_EMAIL_API_KEY,
    VERIFY_EMAIL_ENDPOINT
} = process.env

const {
    emailStatusEnum,
    getEmailStatus
} = require('../utils')

const login = async (req, res) => {
    try {
        let user = null
        if (req.body.username) {
            user = await User.findOne({
                where: { username: req.body.username }
            })
        } else if (req.body.email) {
            user = await User.findOne({
                where: { email: req.body.email }
            })
        }
        if (user === null) {
            return res.status(404).send('Cannot find user')
        }
        if (await bcrypt.compare(req.body.password, user.password)){
            return res.status(200).json({
                accessToken: generateAccessToken(user.id)
            })
        } else {
            return res.status(403).send('Not Allowed')
        }
    } catch (error) {
        return res.sendStatus(500)
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET)
}

const logout = async (req, res) => {
    try {
        //somehow logout user ?
        return res.sendStatus(204)
    } catch (error) {
        return res.sendStatus(403)
    }
}

const updateUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        if (user === null) {
            return res.status(404).send(`This user ID doesn't exist : ${req.query.id}`)
        }
        return res.status(200).json(
            await user.update(req.body, {
                where: { id: req.query.id }
            })
        )
    } catch (error) {
        res.sendStatus(500)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.headers.user
        await user.update(req.body, {
            where: { id: req.id }
        })
        res.status(200).send(req.body)
    } catch (error) {
        res.sendStatus(404)
    }
}

const addScoreById = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        await user.update({ score: parseInt(parseInt(user.score) + parseInt(req.query.score)) }, {
            where: { id: req.query.id }
        })
        return res.status(200).send(`${user.username} new score : ${user.score}`)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const addScore = async (req, res) => {
    try {
        await req.headers.user.update({ score: parseInt(parseInt(req.headers.user.score) + parseInt(req.query.score)) }, {
            where: { id: req.headers.user.id }
        })
        return res.status(200).send(`${req.headers.user.username} new score : ${req.headers.user.score}`)
    } catch (error) {
        return res.sendStatus(500)
    }
}

/*
*   Warning ! An admin can remove admin rights to another admin
*/
const setAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.query.id)
        if (user === null) {
            return res.status(404).send(`This user ID doesn't exist : ${req.query.id}`)
        }
        req.query.isAdmin = req.query.isAdmin === "true" ? true : false
        await user.update(req.body, {
            where: { admin: req.query.isAdmin}
        })        
        return res.status(200).send(`${user.username} is ${req.query.isAdmin === true ? "now administrator" : "no longer administrator"}.`)
    } catch (error) {
        res.sendStatus(500)
    }
}

const count = async (req, res) => {
    try {
        return res.status(200).send((await User.count()).toString())
    } catch (error) {
        return res.sendStatus(500)
    }
}

// Password should be sent encrypted by frontend
const create = async (req, res) => {
    try {
        const emailStatus = await getEmailStatus(req.body.email)
        if (emailStatus === emailStatusEnum.INVALID) {
            return res.status(422).send("This email is not valid")
        }
        if (emailStatus === emailStatusEnum.UNKNOWN) {
            return res.status(422).send("We can't check this email domain name. Try to use a public one.")
        }
        const newUser = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
            admin: req.query.apiKey && req.query.apiKey === API_KEY ? req.body.admin : false,
		score: 0
        })
        return res.status(201).json({
            accessToken: generateAccessToken(newUser.id)
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(424).send(
                error.parent.constraint === "users_email_key" && "Email address already used"
                || error.parent.constraint === "users_username_key" && "Username already used"
            )
        }
        return res.sendStatus(500)
    }
}

const deleteById = async (req, res) => {
    try {
        const userToDelete = await User.findByPk(req.query.id)
        if (userToDelete === null) {
            return res.status(404).send(`This user ID doesn't exist : ${req.query.id}`)
        }
        await userToDelete.destroy()
        return res.status(200).send('Deleted')
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        return users.length > 0 ? res.status(200).json(users) : res.status(404).send("There are no available users.")
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.query.id },
            attributes: { exclude: ['password'] }
        })
        return user !== null ? res.status(200).json(user) : res.status(404).send("This user ID doesn't exist.")
    } catch (error) {
        return res.sendStatus(404)
    }
}

const getByUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.query.username },
            attributes: { exclude: ['password'] }
        })
        return user !== null ? res.status(200).json(user) : res.status(404).send("This username doesn't exist.")
    } catch (error) {
        return res.sendStatus(500)
    }
}

const getByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.query.email },
            attributes: { exclude: ['password'] }
        })
        return user !== null ? res.status(200).json(user) : res.status(404).send("This email doesn't exist.")
    } catch (error) {
        return res.sendStatus(404)
    }
}

const getUser = async (req, res) => {
    try {
        if (req.headers.user === null) {
            return res.status(404).send("This user doesn't exist.")
        }
        const user = req.headers.user
        delete user.dataValues.password
        delete user._previousDataValues.password
        return res.status(200).json(user)
    } catch (error) {
        return res.sendStatus(500)
    }
}

module.exports = {
    addScoreById,
    addScore,
    setAdmin,
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
