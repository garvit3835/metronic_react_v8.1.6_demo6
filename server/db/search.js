const searchdb = async(searchTerm) => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.find({ name: { $regex: `${searchTerm}`, $options: 'i' } }).toArray()
    // console.log(data)
    return data
    
}
// searchdb()

module.exports = searchdb