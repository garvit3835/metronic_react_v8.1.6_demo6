const readdb = async(page, pageSize) => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.find().sort({_id: -1}).skip(page * pageSize).limit(parseInt(pageSize)).toArray()
    // console.log(data)
    return data
    
}
// readdb()

module.exports = readdb