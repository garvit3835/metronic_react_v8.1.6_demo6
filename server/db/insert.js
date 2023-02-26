const insertdb = async (name, age, email, salary, country, state, city) => {
    const connect = require("./connect");
    const collection = await connect();
    const myobj = { name: name, age: age, email: email, salary: salary, country: country, state: state, city: city };
    await collection.insertOne(myobj)
}
// insertdb("hio", 34, "fdsf", 234, "fdsf", "fdsf", "sdfds")

module.exports = insertdb