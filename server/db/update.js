const updatedb = async (id, name, age, email, salary, country, state, city) => {
	const connect = require("./connect");
	let collection = await connect();
	const ObjectId = require('mongodb').ObjectId
	await collection.updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: {
				"name": name,
				"age": age,
				"email": email,
				"salary": salary,
				"country": country,
				"state": state,
				"city": city,
			},
		},
	)
};

module.exports = updatedb;
