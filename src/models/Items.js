const Database = require('./Database')

class Items extends Database {
    constructor(params = {}) {
        super()
        this.collection = 'items'
    }
}

module.exports = Items