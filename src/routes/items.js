const router = require('express').Router()
const { items } = require('../controllers')

router.get('/', items.list)

module.exports = router