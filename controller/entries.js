let express = require('express')
let router = express.Router()
let { postNewEntry, bringUserEntries, editEntry, deleteEntry, bringSingleEntry } = require('../services/entries-service')



router.post('', postNewEntry)

router.get('/home', bringUserEntries)

router.put('/edit', editEntry)

router.delete('/delete', deleteEntry)

router.get('/singleEntry/:id', bringSingleEntry)


module.exports = router