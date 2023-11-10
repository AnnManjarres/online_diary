let express = require('express')
let router = express.Router()
let { createUser, logoutUser } = require('../services/auth_service')
let passport = require('passport')


router.post('/login', passport.authenticate('local', {
    successRedirect: '/entries/home',
    failureMessage: 'Unable to login'
}))

router.post('/signup', createUser)

router.post('/logout', logoutUser)

module.exports = router