const auth = require('../mw/auth')

const login = (async (req, res) => {
    res.json(auth.login(req))
})

module.exports = {
    login: login
}
