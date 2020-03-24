const router = require('express').Router()

//importando rutas
const users = require('./users')
const properties = require('./properties')

router.use('/users', users)
router.use('/properties', properties)

module.exports = router