const router = require('express').Router()
const { items } = require('../controllers')

router.get('/', items.list)
router.post('/', items.create)
router.get('/:id', items.show)
router.patch('/:id', items.update)
router.delete('/:id', items.destroy)

module.exports = router