import React, { useState } from "react";

export default function Update() {
	const [name, setName] = useState("");
	const [age, setAge] = useState();
	const [email, setEmail] = useState("");
	const [salary, setSalary] = useState();
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
        let data = {
            id: "63f84cbdb66edb61be6eb456",
			name: name,
			age: age,
			email: email,
			salary: salary,
			country: country,
			state: state,
			city: city,
		};
		await fetch("http://localhost:5000/api/employees/put", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			// .then((response) => response.json())
			// .then((info) => setData(info))
			// .catch((error) => console.log(error));
	};

	return (
		<div>
			<form>
				<input
					type="text"
					placeholder="Enter name"
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Enter age"
					onChange={(e) => setAge(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="number"
					placeholder="Enter salary"
					onChange={(e) => setSalary(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Enter country"
					onChange={(e) => setCountry(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Enter state"
					onChange={(e) => setState(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Enter city"
					onChange={(e) => setCity(e.target.value)}
					required
				/>
				<button type="submit" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
}

