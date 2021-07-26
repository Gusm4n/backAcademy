const router = require('express').Router()
const { products } = require('../controllers')

router.get('/', products.list)

module.exports = router