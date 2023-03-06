const readdb = async(page) => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.find().skip(page * 3).limit(3).toArray()
    // console.log(data)
    return data
    
}
// readdb()

module.exports = readdb