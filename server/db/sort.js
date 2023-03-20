const sortdb = async(page) => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.find().skip(page * 3).limit(3).toArray().sort({name: -1})
    // console.log(data)
    return data
    
}
// readdb()

module.exports = sortdb