const insertdb = async (name, age, email, salary, country, state, city) => {
	const connect = require("./connect");
	const collection = await connect();
	let duplicate = await collection.findOne({ email: email });
	if (duplicate == null) {
		console.log("record added");
		const myobj = {
			name: name,
			age: age,
			email: email,
			salary: salary,
			country: country,
			state: state,
			city: city,
		};
		await collection.insertOne(myobj);
		return true;
	} else {
		console.log("duplicate record");
		duplicate = null;
		return false;
	}
};
// insertdb("hio", 34, "fdsf@gmail.com", 234, "fdsf", "fdsf", "sdfds")

module.exports = insertdb;
