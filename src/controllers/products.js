const httpStatus = require('http-status')
const { Products } = require('../models')
const { safeObjectId } = require('../helpers')

const methods = {
    async list(request, response) {
        const products = new Products()

        try {
            const productsList = await products.list({deletedAt: { $exists: false }})

            response.status(httpStatus.OK).json(productsList)
        } catch (error) {
             response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async create(request, response) {
        const { name, shade, image, description, id, averagePrice, measurement } = request.body

        const products = new Products()

        if (!name || !shade || !image || !description || !id || !averagePrice || !measurement) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'Please fill all fields correctly.' })
        }

        try {
            const insertedObject = await products.insertOne({ name, shade, image, description, averagePrice, measurement, createdAt: Date.now(), updatedAt: Date.now() })

            response.status(httpStatus.CREATED).json(insertedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async show(request, response) {
        const { id } = request.params
        
        const convertedObjectId = safeObjectId(id)
        const products = new Products()

        try {
            const productsToReturn = await products.findOne({ _id: convertedObjectId })

            response.status(httpStatus.OK).json(productsToReturn)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async update(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)
        const { name, shade, image, description, averagePrice, measurement } = request.body
        
        if (!name || !shade) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'Please fill all fields correctly.' })
        }
        /* O código acima está fazendo update apenas no name e no shade do produto cadastrado */

        const products = new Products()

        try {
            const updateProducts = await products.updateOne({ _id: convertedObjectId }, { name, shade, udpated: Date.now() })

            response.status(httpStatus.OK).json(updateProducts)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async destroy(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const products = new Products()

        try {
            const destroyProducts = await products.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })

            response.status(httpStatus.NO_CONTENT).json()
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

module.exports = methods