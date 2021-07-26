const router = require('express').Router()

const items = require('./items')
const products = require('./products')

router.use('/items', items)
router.use('/products', products)

module.exports = router