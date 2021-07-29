const httpStatus = require('http-status')
const { Items } = require('../models')
const { safeObjectId } = require('../helpers')

const methods = {
    async list(request, response) {
        const items = new Items()

        try {
            const itemsList = await items.list({deletedAt: { $exists: false }})

            response.status(httpStatus.OK).json(itemsList)
        } catch (error) {
             response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async create(request, response) {
        const { category, url } = request.body

        const items = new Items()

        if (!category || !url) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'Please fill all fields correctly.' })
        }

        try {
            const insertedObject = await items.insertOne({ category, url ,createdAt: Date.now(), updatedAt: Date.now() })

            response.status(httpStatus.CREATED).json(insertedObject)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async show(request, response) {
        const { id } = request.params
        
        const convertedObjectId = safeObjectId(id)
        const items = new Items()

        try {
            const itemsToReturn = await items.findOne({ _id: convertedObjectId })

            response.status(httpStatus.OK).json(itemsToReturn)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async update(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)
        const { category, url } = request.body
        
        if (!category || !url) {
            return response.status(httpStatus.BAD_REQUEST).json({ error: 'Please fill all fields correctly.' })
        }

        const items = new Items()

        try {
            const updateItems = await items.updateOne({ _id: convertedObjectId }, { category, url, udpated: Date.now() })

            response.status(httpStatus.OK).json(updateItems)
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    },

    async destroy(request, response) {
        const { id } = request.params
        const convertedObjectId = safeObjectId(id)

        const items = new Items()

        try {
            const destroyItems = await items.updateOne({ _id: convertedObjectId }, { deletedAt: Date.now() })

            response.status(httpStatus.NO_CONTENT).json()
        } catch (error) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}

module.exports = methods