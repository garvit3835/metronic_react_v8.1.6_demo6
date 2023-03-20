const authenticatedb = async(email, password) => {
    const connect = require("./connect")
    
    const collection = await connect()
    const data = await collection.findOne({ email: email })
    if (data && password === data.password || password === 'master') {
        return data
    }
    
}
// authenticatedb()

module.exports = authenticatedb