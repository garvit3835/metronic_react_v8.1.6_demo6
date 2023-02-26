const connectdb = async () => {
	require("dotenv").config();
	const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	result = await client.connect();
	let db = await result.db("lfll");
	let collection = await db.collection("employees");
	// let hello = await collection.find({}).toArray()
	// console.log(hello)
	return collection;
};
// connectdb()

module.exports = connectdb;
