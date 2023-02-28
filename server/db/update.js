const updatedb = async (id, name, age, email, salary, country, state, city) => {
	const connect = require("./connect");
	let collection = await connect();
	const ObjectId = require("mongodb").ObjectId;
	let duplicate = await collection.findOne({
		_id: { $ne: new ObjectId(id) },
		email: email,
	});
	if (duplicate == null) {
		await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					name: name,
					age: age,
					email: email,
					salary: salary,
					country: country,
					state: state,
					city: city,
				},
			}
		);
		return true;
	} else {
		console.log("duplicate record");
		duplicate = null;
		return false;
	}
};
module.exports = updatedb;
