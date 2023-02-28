const connectdb = async () => {
	require("dotenv").config();
	const { MongoClient, ServerApiVersion} = require("mongodb");
	const uri = "mongodb+srv://abcd1234:new1234@cluster0.hpgfy3l.mongodb.net/?retryWrites=true&w=majority";
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
// connectdb();

module.exports = connectdb;
