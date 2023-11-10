let express = require('express')
let router = express.Router()
let {Entry} = require('../models/models')


router.get('', (req, res) => {
    if(req.user) {
        res.redirect('/entries/home')
    } 
    else {
        res.render('index')
    }
    
})


router.get('/login', (req, res) => {
    if(req.user) {
        res.redirect('/entries/home')
    } 
    else {
        res.render('login')
    }
    
})

router.get('/signup', (req, res) => {
    if(req.user) {
        res.redirect('/entries/home')
    } 
    else {
        res.render('signup')
    }
    
    
})

router.get('/add-entry', (req, res, next) => {
    if(!req.user) {
        res.json({message:'Usuario no autenticado'})
        next()
    }else {
        res.render('new-entry')
    }
    
})

module.exports = router