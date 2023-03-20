const express = require("express");
const app = express();
const port = 5000;
const updatedb = require("./db/update");
const readdb = require("./db/read");
const insertdb = require("./db/insert");
const deletedb = require("./db/delete");
const searchdb = require("./db/search");
const authenticatedb = require("./db/authenticate");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Hello World!");
});

// readdb()

app.get("/api/employees/:page/:pageSize", async (req, res) => {
	const data = await readdb(req.params.page, req.params.pageSize);
	res.json(data);
	// console.log(data)
});

app.post("/api/employees/authenticate", async (req, res) => {
	const data = await authenticatedb(req.body.email, req.body.password);
	if (data) {
		res.json(data);
	} else {
		res.json();
	}
	// console.log(data)
});

app.post("/api/employees/search", async (req, res) => {
	const data = await searchdb(req.body.search);

	res.json(data);

	// console.log(data)
});

// const show = async () => {
// 	const data = await searchdb("ar")
// 	console.log(data)
// }
// show()

app.post("/api/employees/insert/:page/:pageSize", async (req, res) => {
	const { name, age, email, salary, country, state, city, password } = req.body;
	const insert = await insertdb(
		name,
		age,
		email,
		salary,
		country,
		state,
		city,
		password
	);
	if (insert) {
		const data = await readdb(req.params.page, req.params.pageSize);
		res.json(data);
	} else {
		res.json();
	}
});

app.delete("/api/employees/delete/:id/:page/:pageSize", async (req, res) => {
	await deletedb(req.params.id);
	const data = await readdb(req.params.page, req.params.pageSize);
	res.json(data);
});

app.put("/api/employees/put/:page/:pageSize", async (req, res) => {
	const { id, name, age, email, salary, country, state, city } = req.body;
	const update = await updatedb(
		id,
		name,
		age,
		email,
		salary,
		country,
		state,
		city
	);
	if (update) {
		const data = await readdb(req.params.page, req.params.pageSize);
		res.json(data);
	} else {
		res.json();
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
