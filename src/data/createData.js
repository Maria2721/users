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
			name: `Пользователь ${i}`,
			department: `Отдел ${i}`,
			company: `Компания ${i}`,
			jobTitle: `Должность ${i}`,
		});
	}
	return data;
};

const millionData = generateData(1000000); // Генерация миллиона данных
writeToFile("users.json", JSON.stringify(millionData)); // Создание JSON-файла
