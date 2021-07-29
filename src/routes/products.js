const router = require('express').Router()
const { products } = require('../controllers')

router.get('/', products.list)
router.post('/', products.create)
router.get('/:id', products.show)
router.patch('/:id', products.update)
router.delete('/:id', products.destroy)

module.exports = router