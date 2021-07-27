const MongoDB = require('mongodb')
const secrets = require('../../secrets.json')

const MongoClient = MongoDB.MongoClient
const MongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

class Database {
    constructor() {
        this.collection = ''
    }

    async _getMongoClientAndCollection() {
        const mongoURI = secrets.mongoURI

        const client = await MongoClient.connect(mongoURI, MongoOptions)
        const database = client.db()
        const collection = database.collection(this.collection)

        return { client, collection }
    }

    async insertOne(objectInsert) {
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            const document = await collection.insertOne(objectInsert)

            client.close()

            return document
        } catch (error) {
            throw new Error(error)
        }
    }

    async list(params = {}, sort = {}) {
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            const documents = await collection.find(params).sort(sort).toArray()

            client.close()

            return document

        } catch (error) {
            throw new Error(error)
        }
    }

    async updateOne(queryFilter, newValues) {
        const { client, collection } = await this._getMongoClientAndCollection()

        try {
            const documents = await collection.findOneAndUpdate(queryFilter, { $set: newValues }, { returnDocument: 'after' })

            client.close()

            return document
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOne(queryFilter) {
        try {
            const documents = await collection.findOne(queryFilter)

            client.close()

            return document
        } catch (error) {
            throw new Error(error)
        }
    }
}


module.exports = Database