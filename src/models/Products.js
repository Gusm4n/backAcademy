const Database = require('./Database')

class Products extends Database {
    constructor(params = {}) {
        super()
        this.collection = 'products'
    }
}


module.exports = Products