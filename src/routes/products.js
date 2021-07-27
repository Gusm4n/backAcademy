const router = require('express').Router()
const { products } = require('../controllers')

router.get('/', products.list)
router.post('/', products.create)
router.get('/:id', products.show)

module.exports = router