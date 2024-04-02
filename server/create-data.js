const { writeFile } = require("fs/promises");

async function writeToFile(fileName, data) {
	try {
		await writeFile(fileName, data);
		console.log(`Wrote data to ${fileName}`);
	} catch (error) {
		console.error(
			`Got an error trying to write the file: ${error.message}`
		);
	}
}

// Генерация миллиона данных пользователей
const generateData = (count) => {
	let data = [];
	for (let i = 1; i <= count; i++) {
		data.push({
			id: i,
			name: `Имя ${i}`,
			surname: `Фамилия ${i}`,
			age: Math.floor(Math.random() * 50) + 20,
			email: `email${i}@example.com`,
		});
	}
	return { users: data };
};

const millionData = generateData(10000); // Генерация миллиона данных
writeToFile("db.json", JSON.stringify(millionData)); // Создание JSON-файла
