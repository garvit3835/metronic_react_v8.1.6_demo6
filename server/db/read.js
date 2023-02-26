const { ObjectId } = require("mongodb")

const readdb = async() => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.find().toArray()
    return data
}
// readdb()

module.exports = readdb