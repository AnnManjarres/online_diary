let { User, Entry } = require('../models/models')

//Create a new entry
let postNewEntry = async (req, res, next) => {
    if(!req.user) {
        res.json({message: "Usuario no autenticado"})
        next()
    }
    let body = req.body
    try {
        let newEntry = await Entry.create({
            user_id: req.user.id,
            content: body.content
        })
        res.json({message: `Nueva entrada creada ${newEntry}`})
    }
    catch(err){
        res.json({error: `there has been an errors ${err}`})
    }

}


//Get all of the users entries
let bringUserEntries = async (req, res, next) => {
    if(!req.user) {
        res.json({message: "Usuario no autorizado"})
        next
    }
    try {
        let allEntries = await Entry.findAll({where:{user_id: req.user.id}})
        res.render('home', {user: req.user, entries: allEntries})
    }
    catch(err) {
        res.redirect('/login')
    }
}

//Edit a specific user entry
let editEntry = async (req, res, next) => {
    if(!req.user) {
        res.json({message: "Usuario no tiene permiso de hacer esta accion"})
        next()
    }
    let body = req.body
    try {
        let newEntry = await Entry.update({content: body.content}, {where: {id: body.id}})
        res.json({message: `Updated entry with id ${body.id}`})

    }
    catch(err) {
        res.json({error: `there has been an errors ${err}`})
    }

}



//Delete user entry
let deleteEntry = async (req, res, next) => {
    if(!req.user) {
        res.json({message: "Usuario no tiene permiso de hacer esta accion"})
        next()
    }
    let id = req.body.id
    console.log(id)
    try {
        await Entry.destroy({where: {id: id}})
        res.json({message:`Entry with id ${id} was deleted`})
    }
    catch(err) {
        res.json({error: `There has been an error deleting: ${err}`})
    }

}


//Get a single user entry
let bringSingleEntry = async(req, res, next) => {
    if(!req.user) {
        res.json({message: "Usuario no autorizado"})
        next()
    } else {
        let id = req.params.id
        try {
            let entry = await Entry.findOne({where:{id: id}})
            res.render('edit-entry', {entry: entry})
        }
        catch(err) {
            res.json({error: `There has been an error ${err}`})
        }

    }

}

module.exports = {postNewEntry, bringUserEntries, editEntry, deleteEntry, bringSingleEntry }