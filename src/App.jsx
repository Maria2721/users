import users from "./data/users.json";

const firstFive = users.slice(0, 5);
console.log(firstFive);

function App() {
	return (
		<>
			<h1>Start!</h1>
		</>
	);
}

export default App;
