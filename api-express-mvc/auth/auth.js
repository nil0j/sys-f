const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

function login(req) {
    if (!areCredentialsValid(req.body.user, req.body.password)) {
        return {
            access: `denied`,
            message: `access denied for ${req.body.user}`,
        }
    }
    return {
        access: "authorized",
        token: generateToken(req.body.user)
    }
}

function areCredentialsValid(user, password) {
    if (user == "user" && password == "password") {
        return true
    }

    return false
}

function generateToken(user) {
    return jwt.sign({ username: user }, process.env.TOKEN, { expiresIn: '5d' })
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    login: login,
    authenticateToken: authenticateToken,
}
