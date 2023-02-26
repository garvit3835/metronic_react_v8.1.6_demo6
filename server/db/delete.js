const deletedb = async (id) => {
    const connect = require("./connect");
    const collection = await connect();
    const ObjectId = require('mongodb').ObjectId
    await collection.deleteOne({_id: new ObjectId(id) })
}
// deletedb("63f79696136dde611eb8b1b1")

module.exports = deletedb