require('dotenv').config()
let {User} = require('../models/models')
let bcrypt = require('bcrypt')
let saltRounds = parseInt(process.env.SALT_ROUNDS)
let passport = require('passport')
let LocalStrategy = require('passport-local')

let getUsers = (req, res) => {
    User.findAll()
    .then(users => {
        res.send(users)
    }) 
}

//Create new user
let createUser = async(req, res) => {
    let body = req.body
    let user = await User.findOne({where: {username: body.username}})
    if(user === null) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) throw err
            bcrypt.hash(body.password, salt, async (err, hash) => {
                if(err) throw err;
                try {
                    let newuser = await User.create({fullname: body.fullname, username: body.username, password: hash})
                    res.json({message: `User created: ${body.username}`})
                }catch(err) {
                    res.json({error: 'There has been a problem with creating a user'})
                }
            })
        })

    } else {
        res.json({ message: 'That username already exists'})
    }
    
}



//passport stratefy config
passport.use(new LocalStrategy(async (username, password, done) => {
    //Using .then and .catch
    /* User.findOne({where:{username: username}})
    .then((user) => {
        if(user === null) {return done(null, false, {message: 'Usuario no encontrado'})}
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {return done(err)}
                if(!result) {return done(null, false, {message: 'Contrasena incorrecta'})}
                if(result) {
                    user = user.dataValues
                    console.log(user)
                    return done(null, user)
                }
            })
        }
    })
    .catch((err) => {
        console.log(err)
        return done(err)
    })
    */

    //Using try catch
    try {
        let user = await User.findOne({where: {username: username}})
        if(user === null) {
            return done(null, false, {message: 'Usuario no encontrado'})
        } if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {return done(err)}
                if(!result) {return done(null, false, {message: 'Contrasena incorrecta'})}
                if(result) {
                    return done(null, user)
                }
            })
        }
    }
    catch(err) {
        return done(err)
    }
    
}))

//Serialize user to start new session
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        console.log(user.id, user.username)
        return done(null, {id: user.id, username: user.username})
    })
})

passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user)
    })
})




//Log out user
let logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err) { console.log("there was an error"); return next(err)}
        else {
            res.send("Logged out")
        }
        
    })
}


//check if user is authenticated


module.exports = { createUser, logoutUser, getUsers}